import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

const CACHE_FILE = path.join(os.tmpdir(), 'gas-prices-cache.json');
const CACHE_TTL_MS = 3600 * 1000; // 1 hour in milliseconds

export async function GET() {
  const apiKey = process.env.EIA_API_KEY || process.env.NEXT_PUBLIC_EIA_API_KEY;

  // 1. Try to read from valid cache first to improve performance
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const stats = fs.statSync(CACHE_FILE);
      if (Date.now() - stats.mtimeMs < CACHE_TTL_MS) {
        const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
        if (cachedData && typeof cachedData.oilPrice !== 'undefined') {
          return NextResponse.json(cachedData);
        }
      }
    }
  } catch (err) {
    console.error("Error reading gas prices cache:", err);
  }

  // 2. Fetch fresh data if cache is expired or doesn't exist
  if (apiKey) {
    try {
      // Use EIA API v2
      const url = `https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key=${apiKey}&frequency=weekly&data[0]=value&facets[product][]=EPMR&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000`;
      
      const res = await fetch(url, { next: { revalidate: 3600 } });
      
      if (res.ok) {
        const data = await res.json();
        
        if (data && data.response && data.response.data && data.response.data.length > 0) {
          const latestPeriod = data.response.data[0].period;
          const currentData = data.response.data.filter(d => d.period === latestPeriod);
          
          const formattedPrices = currentData.map(item => {
            return {
              city: item["area-name"] || item.area || "",
              price: parseFloat(item.value).toFixed(2)
            };
          })
          // Filter out full US average and any PADD regions to focus on specific cities/states
          .filter(item => 
            item.city && 
            !item.city.includes("U.S. All") && 
            !item.city.includes("PADD") &&
            !item.city.includes("Petroleum Administration")
          );
          
          if (formattedPrices.length > 0) {
            const asOfDate = latestPeriod; // EIA period is typically YYYY-MM-DD
            
            // Calculate next survey date (usually weekly on Mondays)
            let nextSurveyDate = "";
            try {
              const d = new Date(latestPeriod);
              d.setDate(d.getDate() + 7);
              nextSurveyDate = d.toISOString().split('T')[0];
            } catch (e) {
              console.error("Error calculating next survey date", e);
            }

            // Fetch crude oil trend (WTI Spot Price)
            let trend = 'flat';
            let oilPrice = 0;
            try {
              const oilUrl = `https://api.eia.gov/v2/petroleum/pri/spt/data/?api_key=${apiKey}&frequency=weekly&data[0]=value&facets[series][]=RWTC&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=2`;
              const oilRes = await fetch(oilUrl);
              if (oilRes.ok) {
                const oilData = await oilRes.json();
                if (oilData?.response?.data?.length >= 2) {
                  const latestOil = parseFloat(oilData.response.data[0].value);
                  const prevOil = parseFloat(oilData.response.data[1].value);
                  oilPrice = latestOil;
                  if (latestOil > prevOil) trend = 'up';
                  else if (latestOil < prevOil) trend = 'down';
                }
              }
            } catch (oilErr) {
              console.error("Error fetching oil trend:", oilErr);
            }

            const responsePayload = {
              prices: formattedPrices,
              asOfDate,
              nextSurveyDate,
              trend,
              oilPrice
            };

            // Write to cache for future requests
            try {
              fs.writeFileSync(CACHE_FILE, JSON.stringify(responsePayload), 'utf8');
            } catch (writeErr) {
              console.error("Error writing gas prices cache:", writeErr);
            }
            return NextResponse.json(responsePayload);
          }
        }
      } else {
        console.warn(`EIA API returned status: ${res.status}. Attempting to use stale cache.`);
      }
    } catch (e) {
      console.error("Failed to fetch from EIA API:", e);
    }
  } else {
    console.warn("No EIA_API_KEY found in environment variables.");
  }

  // 3. If API fetch failed or no key, try to use stale cache as fallback
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const staleCachedData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      if (staleCachedData) {
        console.warn("Using stale cache for gas prices as fallback.");
        return NextResponse.json(staleCachedData);
      }
    }
  } catch (err) {
    console.error("Error reading stale gas prices cache:", err);
  }

  // 4. Absolute fallback mock data
  const mockGasPrices = [
    { city: "Los Angeles, CA", price: 5.23 },
    { city: "New York, NY", price: 3.45 },
    { city: "Chicago, IL", price: 3.98 },
    { city: "Houston, TX", price: 2.89 },
    { city: "Phoenix, AZ", price: 3.79 },
    { city: "Philadelphia, PA", price: 3.52 },
    { city: "San Antonio, TX", price: 2.85 },
    { city: "San Diego, CA", price: 5.18 },
    { city: "Dallas, TX", price: 2.92 },
    { city: "San Jose, CA", price: 4.95 },
    { city: "Austin, TX", price: 2.95 },
    { city: "Jacksonville, FL", price: 3.15 },
    { city: "Fort Worth, TX", price: 2.91 },
    { city: "Columbus, OH", price: 3.25 },
    { city: "Indianapolis, IN", price: 3.32 },
    { city: "Charlotte, NC", price: 3.10 },
    { city: "San Francisco, CA", price: 5.35 },
    { city: "Seattle, WA", price: 4.58 },
    { city: "Denver, CO", price: 3.12 },
    { city: "Washington, DC", price: 3.55 }
  ];

  const updatedPrices = mockGasPrices.map(item => ({
    ...item,
    price: (item.price + (Math.random() * 0.1 - 0.05)).toFixed(2)
  }));

  // Mock dates for fallback
  const today = new Date();
  const lastMonday = new Date();
  lastMonday.setDate(today.getDate() - (today.getDay() + 6) % 7);
  const nextMonday = new Date(lastMonday);
  nextMonday.setDate(lastMonday.getDate() + 7);

  return NextResponse.json({
    prices: updatedPrices,
    asOfDate: lastMonday.toISOString().split('T')[0],
    nextSurveyDate: nextMonday.toISOString().split('T')[0],
    trend: 'flat',
    oilPrice: 78.45
  });
}
