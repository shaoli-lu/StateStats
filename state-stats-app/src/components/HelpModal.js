'use client';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} aria-hidden={!isOpen}>
      <div className="modal-content help-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close help">&times;</button>

        <div className="help-header">
          <span className="help-icon">💡</span>
          <h2>How to use State Stats</h2>
        </div>

        <div className="help-body">
          <div className="help-item">
            <div className="help-item-icon">🎬</div>
            <div className="help-item-text">
              <h3>Slide the States</h3>
              <p>Sit back and enjoy an automated tour of all 50 states. Use the controls to pause, skip, or jump to your favorite state.</p>
            </div>
          </div>

          <div className="help-item">
            <div className="help-item-icon">📊</div>
            <div className="help-item-text">
              <h3>Data Deep Dive</h3>
              <p>Explore population rankings. Use the <strong>City Toggle</strong> to see the largest cities and what they're famous for!</p>
            </div>
          </div>

          <div className="help-item">
            <div className="help-item-icon">🏛️</div>
            <div className="help-item-text">
              <h3>State Insights</h3>
              <p>Click on any state to reveal a detailed fact sheet. Discover its motto, statehood history, state flower/bird, and more!</p>
            </div>
          </div>

          <div className="help-item">
            <div className="help-item-icon">🎡</div>
            <div className="help-item-text">
              <h3>Spin & Win</h3>
              <p>Feeling smart? Spin the patriotic wheel to land on a random state and answer a trivia question about its unique facts.</p>
            </div>
          </div>

          <div className="help-item">
            <div className="help-item-icon">⛽</div>
            <div className="help-item-text">
              <h3>Live Gas Prices</h3>
              <p>Check the Gas Price tab for a real-time scrolling banner of fuel costs across major cities and states. Sort the prices, drag to scroll, and explore the interactive EIA map.</p>
            </div>
          </div>

          <div className="help-item featured">
            <div className="help-item-icon">🎉</div>
            <div className="help-item-text">
              <h3>Patriotic Pop</h3>
              <p>Click anywhere on the screen at any time for a festive red, white, and blue confetti celebration!</p>
            </div>
          </div>
        </div>

        <div className="help-footer">
          <button className="help-got-it" onClick={onClose}>Got it, let's explore!</button>
        </div>
      </div>

      <style jsx>{`
        .help-modal-content {
          background: var(--navy-mid);
          border: 1px solid var(--blue-glow);
          border-radius: var(--radius-xl);
          padding: var(--space-2xl);
          position: relative;
          box-shadow: 0 0 50px rgba(37, 99, 235, 0.2);
        }
        
        .help-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-xl);
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: var(--space-md);
        }
        
        .help-icon {
          font-size: 2rem;
        }
        
        .help-header h2 {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--white);
        }
        
        .help-body {
          display: grid;
          gap: var(--space-lg);
        }
        
        .help-item {
          display: flex;
          gap: var(--space-md);
          padding: var(--space-md);
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-lg);
          transition: transform 0.2s ease;
        }
        
        .help-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(5px);
        }
        
        .help-item.featured {
          border: 1px dashed var(--gold);
          background: rgba(245, 158, 11, 0.05);
        }
        
        .help-item-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .help-item-text h3 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--blue-glow);
        }
        
        .help-item-text p {
          font-size: 0.9rem;
          color: var(--gray-300);
          line-height: 1.5;
        }
        
        .help-footer {
          margin-top: var(--space-2xl);
          display: flex;
          justify-content: center;
        }
        
        .help-got-it {
          background: linear-gradient(135deg, var(--blue), var(--blue-light));
          border: none;
          color: white;
          padding: 12px 32px;
          border-radius: var(--radius-full);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }
        
        .help-got-it:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
        }
        
        @media (max-width: 600px) {
          .help-modal-content {
            padding: var(--space-xl) var(--space-md);
          }
          
          .help-header h2 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
