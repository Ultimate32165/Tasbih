import React from 'react';

export function Layout({ children }) {
    return (
        <div className="layout">
            <header className="header">
                <h1>Tasbih</h1>
            </header>
            <main className="main-content">
                {children}
            </main>
            <style>{`
        .layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 480px;
          margin: 0 auto;
          background: var(--bg-color);
          position: relative;
        }
        .header {
          padding: 1.5rem;
          text-align: center;
          background: linear-gradient(to bottom, var(--card-bg), transparent);
        }
        .header h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary-color);
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .main-content {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          padding-bottom: 2rem;
        }
      `}</style>
        </div>
    );
}
