'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { allStates } from '@/data';
import Slideshow from '@/components/Slideshow';
import Population from '@/components/Population';
import Quiz from '@/components/Quiz';
import ConfettiOnClick from '@/components/ConfettiOnClick';

const TABS = [
  { id: 'slideshow', label: 'Slideshow', icon: '🎬' },
  { id: 'population', label: 'Population', icon: '📊' },
  { id: 'quiz', label: 'Quiz', icon: '🎡' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('slideshow');
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStates() {
      try {
        // Try Supabase first
        const { data, error } = await supabase
          .from('states')
          .select('*')
          .order('name');

        if (data && data.length > 0 && !error) {
          setStates(data);
        } else {
          // Fallback to local data
          console.log('Using local data (Supabase not available or empty)');
          setStates(allStates);
        }
      } catch (err) {
        console.log('Using local data:', err.message);
        setStates(allStates);
      } finally {
        setLoading(false);
      }
    }

    fetchStates();
  }, []);

  return (
    <>
      <ConfettiOnClick />

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo-section">
            <img src="/logo.png" alt="State Stats" className="logo-img" />
            <div className="logo-text">
              STATE STATS
              <span>Explore all 50 U.S. States</span>
            </div>
          </div>

          <nav className="tabs" role="tablist">
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p className="loading-text">Loading state facts...</p>
          </div>
        ) : (
          <>
            {activeTab === 'slideshow' && <Slideshow states={states} />}
            {activeTab === 'population' && <Population states={states} />}
            {activeTab === 'quiz' && <Quiz states={states} />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>🇺🇸 State Stats — Learn something new about America every day</p>
        <p style={{ marginTop: '4px', opacity: 0.6 }}>
          Data sourced from U.S. Census Bureau & public records • Built with Next.js
        </p>
      </footer>
    </>
  );
}
