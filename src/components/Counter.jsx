import React, { useState } from 'react';

export function Counter({ tasbih, count, onIncrement, onBack, onReset }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePress = () => {
    setIsAnimating(true);
    onIncrement();
    setTimeout(() => setIsAnimating(false), 150);
  };

  const progress = tasbih.target > 0 ? (count % tasbih.target) / tasbih.target * 100 : 0;
  const isTargetReached = tasbih.target > 0 && count > 0 && count % tasbih.target === 0;

  return (
    <div className="counter-view">
      <div className="top-bar">
        <button onClick={onBack} className="icon-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={onReset} className="icon-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      <div className="counter-content">
        <div className="tasbih-display">
          <h2 className="arabic">{tasbih.arabic}</h2>
          <p className="transliteration">{tasbih.transliteration}</p>
          {tasbih.meaning && <p className="meaning">{tasbih.meaning}</p>}
        </div>

        <button
          className={`counter-btn ${isAnimating ? 'pressed' : ''} ${isTargetReached ? 'target-reached' : ''}`}
          onClick={handlePress}
        >
          <div className="counter-value">{count}</div>
          <svg className="progress-ring-svg" viewBox="0 0 100 100">
            <circle className="progress-ring-bg" cx="50" cy="50" r="45" />
            <circle
              className="progress-ring-circle"
              cx="50"
              cy="50"
              r="45"
              style={{ strokeDashoffset: `${283 - (283 * progress) / 100}` }}
            />
          </svg>
          <div className="glow-effect"></div>
        </button>

        <div className="target-info">
          Target: {tasbih.target === 0 ? '∞' : tasbih.target}
        </div>
      </div>

      <style>{`
        .counter-view {
          display: flex;
          flex-direction: column;
          height: 100%;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .top-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .icon-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: var(--text-color);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .icon-btn:active {
          background: rgba(255, 255, 255, 0.2);
        }
        .counter-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
        }
        .tasbih-display {
          text-align: center;
        }
        .arabic {
          font-size: 3rem;
          color: var(--primary-color);
          margin: 0 0 0.5rem 0;
          font-family: 'Amiri', serif;
          text-shadow: 0 0 30px var(--primary-glow);
        }
        .transliteration {
          font-size: 1.5rem;
          margin: 0;
          font-weight: 600;
        }
        .meaning {
          font-size: 1rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }
        .counter-btn {
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 50px -20px rgba(0,0,0,0.5);
          transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        .counter-btn:active, .counter-btn.pressed {
          transform: scale(0.96);
        }
        .counter-value {
          font-size: 5rem;
          font-weight: 700;
          color: var(--text-color);
          z-index: 2;
          font-variant-numeric: tabular-nums;
        }
        .progress-ring-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
          pointer-events: none;
        }
        .progress-ring-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.05);
          stroke-width: 6;
        }
        .progress-ring-circle {
          fill: none;
          stroke: var(--primary-color);
          stroke-width: 6;
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
          transition: stroke-dashoffset 0.3s ease;
          stroke-linecap: round;
          filter: drop-shadow(0 0 8px var(--primary-glow));
        }
        .target-reached .progress-ring-circle {
          stroke: #fbbf24; /* Amber for target reached */
          filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.6));
        }
        .target-info {
          color: var(--text-muted);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 1rem;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
