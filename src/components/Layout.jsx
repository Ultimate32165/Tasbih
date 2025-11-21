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
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          position: relative;
        }
        .header {
          padding: 2rem 1.5rem;
          text-align: center;
          /* No background, let body gradient show */
        }
        .header h1 {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-color);
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
          background: linear-gradient(to right, #fff, #cbd5e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .main-content {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          padding-bottom: 6rem; /* Space for FAB */
          scrollbar-width: none; /* Firefox */
        }
        .main-content::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
      `}</style>
    </div>
  );
}
