'use client';

import { useState } from 'react';
import StateCard from './StateCard';

export default function Population({ states }) {
  const [selected, setSelected] = useState(null);

  const sorted = [...states].sort((a, b) => b.population - a.population);
  const maxPop = sorted[0]?.population || 1;

  return (
    <>
      <div className="pop-grid">
        {sorted.map((state, i) => (
          <div
            key={state.abbreviation}
            className="pop-row"
            style={{ animationDelay: `${i * 30}ms` }}
            onClick={() => setSelected(state)}
          >
            <div className={`pop-rank ${i < 3 ? 'top-3' : ''}`}>
              {i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}
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
                  className={`pop-bar ${i < 3 ? 'top-3' : ''}`}
                  style={{ width: `${(state.population / maxPop) * 100}%` }}
                />
              </div>
            </div>

            <div className="pop-number">
              {state.population?.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <StateCard state={selected} />
          </div>
        </div>
      )}
    </>
  );
}
