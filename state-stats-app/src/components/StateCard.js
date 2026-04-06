'use client';

export default function StateCard({ state, style }) {
  if (!state) return null;

  const politicalClass = state.political_orientation === 'Republican' ? 'badge-rep' : 'badge-dem';

  return (
    <div className="state-card" style={style}>
      <div className="card-header">
        <div className="card-flag-row">
          <img
            className="card-flag"
            src={state.flag_url}
            alt={`${state.name} flag`}
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="card-title-group">
            <h2 className="card-state-name">{state.name}</h2>
            <p className="card-nickname">&ldquo;{state.nickname}&rdquo;</p>
          </div>
        </div>
        <div className="card-badges">
          <span className="badge badge-order">#{state.statehood_order} State</span>
          <span className={`badge ${politicalClass}`}>{state.political_orientation}</span>
          <span className="badge badge-order">{state.abbreviation}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="card-fact">
          <span className="card-fact-icon">🏛️</span>
          <div className="card-fact-content">
            <div className="card-fact-label">Capital</div>
            <div className="card-fact-value">{state.capital}</div>
          </div>
        </div>

        <div className="card-fact">
          <span className="card-fact-icon">📅</span>
          <div className="card-fact-content">
            <div className="card-fact-label">Statehood</div>
            <div className="card-fact-value">{state.statehood_date}</div>
          </div>
        </div>

        <div className="card-fact">
          <span className="card-fact-icon">👥</span>
          <div className="card-fact-content">
            <div className="card-fact-label">Population ({state.population_year})</div>
            <div className="card-fact-value">{state.population?.toLocaleString()}</div>
          </div>
        </div>

        <div className="card-fact">
          <span className="card-fact-icon">📐</span>
          <div className="card-fact-content">
            <div className="card-fact-label">Area</div>
            <div className="card-fact-value">{state.area_sq_miles?.toLocaleString()} sq mi</div>
          </div>
        </div>

        <div className="card-fact">
          <span className="card-fact-icon">🌸</span>
          <div className="card-fact-content">
            <div className="card-fact-label">State Flower</div>
            <div className="card-fact-value">{state.flower}</div>
          </div>
        </div>

        <div className="card-fact">
          <span className="card-fact-icon">🐦</span>
          <div className="card-fact-content">
            <div className="card-fact-label">State Bird</div>
            <div className="card-fact-value">{state.bird}</div>
          </div>
        </div>

        <div className="card-fact">
          <span className="card-fact-icon">📜</span>
          <div className="card-fact-content">
            <div className="card-fact-label">Motto</div>
            <div className="card-fact-value">{state.motto}</div>
          </div>
        </div>

        <div className="card-fact">
          <span className="card-fact-icon">💰</span>
          <div className="card-fact-content">
            <div className="card-fact-label">State Tax</div>
            <div className="card-fact-value">{state.state_tax_info}</div>
          </div>
        </div>

        <div className="card-fact full-width">
          <span className="card-fact-icon">🏳️</span>
          <div className="card-fact-content">
            <div className="card-fact-label">Flag Meaning</div>
            <div className="card-fact-value">{state.flag_description}</div>
          </div>
        </div>

        <div className="card-fact full-width">
          <span className="card-fact-icon">⭐</span>
          <div className="card-fact-content">
            <div className="card-fact-label">Famous For</div>
            <div className="card-fact-value">{state.famous_for}</div>
          </div>
        </div>

        <div className="card-fact full-width">
          <span className="card-fact-icon">🏭</span>
          <div className="card-fact-content">
            <div className="card-fact-label">Major Employers / Industries</div>
            <div className="card-fact-value">{state.major_employer}</div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="card-fact-label" style={{ marginBottom: '8px' }}>
          🏛️ U.S. Senators &amp; Representatives ({state.representatives_count} House members)
        </div>
        <div className="senators-grid">
          {state.senators?.map((senator, i) => (
            <span key={i} className={`senator-chip party-${senator.party}`}>
              <span>{senator.party === 'R' ? '🔴' : senator.party === 'D' ? '🔵' : '🟡'}</span>
              {senator.name} ({senator.party})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
