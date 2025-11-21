import React from 'react';

export function TasbihList({ tasbihs, onSelect, onDelete }) {
  return (
    <div className="tasbih-list">
      {tasbihs.map((tasbih) => (
        <div key={tasbih.id} className="tasbih-card-wrapper">
          <button
            className="tasbih-card"
            onClick={() => onSelect(tasbih.id)}
          >
            <div className="tasbih-info">
              <span className="tasbih-arabic">{tasbih.arabic}</span>
              <span className="tasbih-transliteration">{tasbih.transliteration}</span>
              <span className="tasbih-meaning">{tasbih.meaning}</span>
            </div>
            <div className="tasbih-target">
              {tasbih.target}
            </div>
          </button>
          {tasbih.isCustom && (
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Delete this Tasbih?')) onDelete(tasbih.id);
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}
      <style>{`
        .tasbih-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .tasbih-card-wrapper {
          position: relative;
        }
        .tasbih-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 1.5rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: inherit;
          width: 100%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .tasbih-card:active {
          transform: scale(0.98);
          background: rgba(30, 41, 59, 0.9);
        }
        .tasbih-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .tasbih-arabic {
          font-size: 1.75rem;
          color: var(--primary-color);
          font-family: 'Amiri', serif;
          text-shadow: 0 0 20px var(--primary-glow);
        }
        .tasbih-transliteration {
          font-weight: 600;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
        }
        .tasbih-meaning {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .tasbih-target {
          font-size: 0.8rem;
          background: rgba(52, 211, 153, 0.1);
          color: var(--primary-color);
          padding: 0.4rem 0.8rem;
          border-radius: 12px;
          border: 1px solid rgba(52, 211, 153, 0.2);
          font-weight: 600;
        }
        .delete-btn {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #ef4444;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.2s;
        }
        .tasbih-card-wrapper:hover .delete-btn {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
}
