'use client';

import { useState, useEffect, useRef } from 'react';

export default function GasPrice() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    fetch('/api/gas-prices')
      .then(res => res.json())
      .then(data => {
        // Duplicate data to create a seamless infinite scroll effect
        setPrices([...data, ...data, ...data]); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching gas prices:", err);
        setLoading(false);
      });
  }, []);

  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    if (loading || isPaused || isDragging) return;
    
    let animationId;
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1.5; 
        
        const maxScroll = scrollRef.current.scrollWidth / 3;
        if (scrollRef.current.scrollLeft >= maxScroll * 2) {
          scrollRef.current.scrollLeft = maxScroll;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [loading, isPaused, isDragging]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handlePointerLeave = () => {
    setIsDragging(false);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    if (!hasDragged) {
      // It was a simple click
      setIsPaused(!isPaused);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    // If movement is significant, set hasDragged
    if (Math.abs(x - startX) > 5) {
      setHasDragged(true);
    }
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="gas-price-container">
      {/* Banner */}
      <div className="gas-banner">
        <div 
          className="marquee-container"
          ref={scrollRef}
          onPointerDown={handlePointerDown}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
        >
          {loading ? (
            <div className="loading-marquee">Loading live gas prices...</div>
          ) : (
            <div className="marquee-content">
              {prices.map((item, index) => (
                <div key={index} className="gas-item">
                  <span className="gas-city">{item.city}</span>
                  <span className="gas-value">${item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="pause-indicator">
          {isPaused ? '⏸ Paused' : '▶ Playing'} (Click to toggle, Drag to scroll)
        </div>
      </div>

      {/* Iframe */}
      <div className="iframe-wrapper">
        <iframe 
          src="https://www.eia.gov/petroleum/gasdiesel/gas_geographies.php#pricesbyregion" 
          className="gas-iframe"
          title="Government Gas by Region"
        />
      </div>

      <style jsx>{`
        .gas-price-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          background: rgba(15, 23, 42, 0.4);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }

        .gas-banner {
          background: rgba(37, 99, 235, 0.15);
          border-bottom: 1px solid var(--glass-border);
          position: relative;
          cursor: pointer;
        }

        .gas-banner:hover {
          background: rgba(37, 99, 235, 0.25);
        }

        .marquee-container {
          overflow-x: hidden;
          white-space: nowrap;
          width: 100%;
          padding: 16px 0;
          cursor: grab;
          touch-action: pan-x;
        }

        .marquee-container:active {
          cursor: grabbing;
        }

        .loading-marquee {
          padding: 0 24px;
          color: var(--text-secondary);
          font-style: italic;
        }

        .marquee-content {
          display: inline-flex;
          align-items: center;
        }

        .gas-item {
          display: inline-flex;
          align-items: center;
          padding: 0 32px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          user-select: none;
        }

        .gas-city {
          margin-right: 12px;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 1.1rem;
        }

        .gas-value {
          color: #10b981; /* accent-green */
          font-weight: 700;
          font-size: 1.2rem;
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }

        .pause-indicator {
          position: absolute;
          bottom: 2px;
          right: 8px;
          font-size: 0.7rem;
          color: var(--text-secondary);
          opacity: 0.6;
          pointer-events: none;
        }

        .iframe-wrapper {
          flex: 1;
          position: relative;
          width: 100%;
          min-height: 60vh;
          overflow: hidden;
          -webkit-overflow-scrolling: touch;
        }

        .gas-iframe {
          width: 100%;
          height: 100%;
          border: none;
          position: absolute;
          top: 0;
          left: 0;
        }

        @media (max-width: 768px) {
          .gas-city {
            font-size: 1rem;
          }
          .gas-value {
            font-size: 1.1rem;
          }
          .gas-item {
            padding: 0 20px;
          }
          .iframe-wrapper {
            min-height: 70vh;
          }
        }
      `}</style>
    </div>
  );
}
