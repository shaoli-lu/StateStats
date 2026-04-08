'use client';

import { useState, useMemo } from 'react';
import StateCard from './StateCard';

export default function Population({ states, cities = [] }) {
  const [selected, setSelected] = useState(null);
  const [showCities, setShowCities] = useState(false);

  const sortedStates = useMemo(() => {
    return [...states].sort((a, b) => b.population - a.population);
  }, [states]);

  const maxPop = sortedStates[0]?.population || 1;

  // Flatten the list if showCities is true
  const listItems = useMemo(() => {
    if (!showCities) return sortedStates.map((s, i) => ({ type: 'state', data: s, index: i }));

    const items = [];
    sortedStates.forEach((state, i) => {
      items.push({ type: 'state', data: state, index: i });
      
      // Find cities for this state
      const stateCities = cities
        .filter(c => c.state === state.name)
        .sort((a, b) => b.population - a.population);
      
      stateCities.forEach((city, ci) => {
        items.push({ type: 'city', data: city, stateData: state, index: ci });
      });
    });
    return items;
  }, [sortedStates, cities, showCities]);

  return (
    <>
      <div className="pop-header">
        <h2 className="section-title">Population Rankings</h2>
        
        <div className="pop-toggle-container">
          <span className="toggle-label">Show Cities</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={showCities} 
              onChange={() => setShowCities(!showCities)} 
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="pop-grid">
        {listItems.map((item, i) => {
          if (item.type === 'state') {
            const state = item.data;
            const rank = item.index;
            return (
              <div
                key={`state-${state.abbreviation}`}
                className="pop-row"
                style={{ animationDelay: `${i * 20}ms` }}
                onClick={() => setSelected(state)}
              >
                <div className={`pop-rank ${rank < 3 ? 'top-3' : ''}`}>
                  {rank < 3 ? ['🥇', '🥈', '🥉'][rank] : rank + 1}
                </div>

                <img
                  className="pop-flag"
                  src={state.flag_url}
                  alt={state.name}
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />

                <div className="pop-info">
                  <div className="pop-name">{state.name}</div>
                  <div className="pop-bar-wrapper">
                    <div
                      className={`pop-bar ${rank < 3 ? 'top-3' : ''}`}
                      style={{ width: `${(state.population / maxPop) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pop-number">
                  {state.population?.toLocaleString()}
                </div>
              </div>
            );
          } else {
            const city = item.data;
            const state = item.stateData;
            return (
              <div
                key={`city-${city.name}-${state.abbreviation}`}
                className="pop-row city-row"
                style={{ animationDelay: `${i * 10}ms` }}
              >
                <div className="pop-rank">↳</div>
                
                <img
                  className="pop-flag"
                  src={state.flag_url}
                  alt={state.name}
                  loading="lazy"
                />

                <div className="pop-info">
                  <div className="pop-name">{city.name}</div>
                  <div className="pop-bar-wrapper">
                    <div
                      className="pop-bar"
                      style={{ 
                        width: `${(city.population / maxPop) * 100}%`,
                        opacity: 0.6
                      }}
                    />
                  </div>
                </div>

                <div className="pop-number">
                  {city.population?.toLocaleString()}
                </div>
              </div>
            );
          }
        })}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <StateCard state={selected} />
          </div>
        </div>
      )}

      <style jsx>{`
        .section-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--white);
        }
      `}</style>
    </>
  );
}
