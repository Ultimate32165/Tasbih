import React, { useEffect, useState } from 'react';

export function Counter({ tasbih, count, onIncrement, onBack, onReset }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePress = () => {
    setIsAnimating(true);
    onIncrement();
    setTimeout(() => setIsAnimating(false), 150);
  };

  const progress = (count % tasbih.target) / tasbih.target * 100;
  const isTargetReached = count > 0 && count % tasbih.target === 0;

  return (
    <div className="counter-view">
      <div className="top-bar">
        <button onClick={onBack} className="icon-btn">← Back</button>
        <button onClick={onReset} className="icon-btn">Reset</button>
      </div>

      <div className="counter-content">
        <div className="tasbih-display">
          <h2 className="arabic">{tasbih.arabic}</h2>
          <p className="transliteration">{tasbih.transliteration}</p>
        </div>

        <button
          className={`counter-btn ${isAnimating ? 'pressed' : ''}`}
          onClick={handlePress}
        >
          <div className="counter-value">{count}</div>
          <div className="progress-ring" style={{ '--progress': `${progress}%` }}></div>
        </button>

        <div className="target-info">
          Target: {tasbih.target}
        </div>
      </div>

      <style>{`
        .counter-view {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .top-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        .icon-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0.5rem;
        }
        .counter-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3rem;
        }
        .tasbih-display {
          text-align: center;
        }
        .arabic {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin: 0 0 0.5rem 0;
        }
        .transliteration {
          font-size: 1.25rem;
          margin: 0;
          color: var(--text-color);
        }
        .counter-btn {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: var(--card-bg);
          border: none;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
          transition: transform 0.1s, box-shadow 0.1s;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        .counter-btn:active, .counter-btn.pressed {
          transform: scale(0.95);
          box-shadow: 0 5px 15px -5px rgba(0,0,0,0.5);
        }
        .counter-value {
          font-size: 4rem;
          font-weight: 700;
          color: var(--text-color);
          z-index: 2;
        }
        /* Simple progress ring simulation */
        .counter-btn::before {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          padding: 5px;
          background: conic-gradient(var(--primary-color) var(--progress), transparent 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.5;
          transition: --progress 0.3s ease;
        }
        .target-info {
          color: #64748b;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
}
