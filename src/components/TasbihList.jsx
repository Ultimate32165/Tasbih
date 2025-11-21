import React from 'react';

export function TasbihList({ tasbihs, onSelect }) {
    return (
        <div className="tasbih-list">
            {tasbihs.map((tasbih) => (
                <button
                    key={tasbih.id}
                    className="tasbih-card"
                    onClick={() => onSelect(tasbih.id)}
                >
                    <div className="tasbih-info">
                        <span className="tasbih-arabic">{tasbih.arabic}</span>
                        <span className="tasbih-transliteration">{tasbih.transliteration}</span>
                        <span className="tasbih-meaning">{tasbih.meaning}</span>
                    </div>
                    <div className="tasbih-target">
                        Target: {tasbih.target}
                    </div>
                </button>
            ))}
            <style>{`
        .tasbih-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .tasbih-card {
          background: var(--card-bg);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 1.25rem;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: inherit;
          width: 100%;
        }
        .tasbih-card:active {
          transform: scale(0.98);
          background: rgba(30, 41, 59, 0.8);
        }
        .tasbih-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .tasbih-arabic {
          font-size: 1.5rem;
          color: var(--primary-color);
          font-family: 'Amiri', serif; /* Fallback to serif for Arabic */
        }
        .tasbih-transliteration {
          font-weight: 600;
          font-size: 1.1rem;
        }
        .tasbih-meaning {
          font-size: 0.875rem;
          color: #94a3b8; /* Slate 400 */
        }
        .tasbih-target {
          font-size: 0.75rem;
          background: rgba(16, 185, 129, 0.1);
          color: var(--primary-color);
          padding: 0.25rem 0.5rem;
          border-radius: 999px;
        }
      `}</style>
        </div>
    );
}
