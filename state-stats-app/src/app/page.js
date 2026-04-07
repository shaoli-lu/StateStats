'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { allStates } from '@/data';
import Slideshow from '@/components/Slideshow';
import Population from '@/components/Population';
import Quiz from '@/components/Quiz';
import ConfettiOnClick from '@/components/ConfettiOnClick';
import HelpModal from '@/components/HelpModal';

const TABS = [
  { id: 'slideshow', label: 'Slideshow', icon: '🎬' },
  { id: 'population', label: 'Population', icon: '📊' },
  { id: 'quiz', label: 'Quiz', icon: '🎡' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('slideshow');
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

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
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo-section">
            <img src="/logo.png" alt="State Stats" className="logo-img" />
            <div className="logo-text">
              <div className="logo-title-row">
                STATE STATS
                <button 
                  className="help-trigger" 
                  onClick={() => setShowHelp(true)}
                  title="How to use"
                >
                  <span className="help-icon">💡</span>
                </button>
              </div>
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
          Data sourced from U.S. Census Bureau & public records • Made with ❤️ and ☕
        </p>
      </footer>

      <style jsx>{`
        .logo-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .help-trigger {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.05);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0;
          color: inherit;
        }

        .help-trigger:hover {
          background: rgba(37, 99, 235, 0.2);
          border-color: var(--blue-glow);
          transform: scale(1.1) rotate(15deg);
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.3);
        }

        .help-trigger .help-icon {
          font-size: 14px;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .logo-title-row {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
