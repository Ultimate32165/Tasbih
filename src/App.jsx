import { useState } from 'react';
import { Layout } from './components/Layout';
import { TasbihList } from './components/TasbihList';
import { Counter } from './components/Counter';
import { AddTasbihForm } from './components/AddTasbihForm';
import { Auth } from './components/Auth';
import { useTasbih } from './hooks/useTasbih';

function App() {
    const {
        tasbihs,
        activeTasbih,
        count,
        addTasbih,
        deleteTasbih,
        selectTasbih,
        increment,
        reset,
        setActiveTasbihId
    } = useTasbih();

    const [isAdding, setIsAdding] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    const handleAdd = (newTasbih) => {
        addTasbih(newTasbih);
        setIsAdding(false);
    };

    return (
        <Layout>
            {showAuth && <Auth onCancel={() => setShowAuth(false)} />}

            {activeTasbih ? (
                <Counter
                    tasbih={activeTasbih}
                    count={count}
                    onIncrement={increment}
                    onBack={() => setActiveTasbihId(null)}
                    onReset={reset}
                />
            ) : isAdding ? (
                <AddTasbihForm
                    onAdd={handleAdd}
                    onCancel={() => setIsAdding(false)}
                />
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                        <button
                            onClick={() => setShowAuth(true)}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: 'var(--text-color)',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            Login / Sync
                        </button>
                    </div>
                    <TasbihList
                        tasbihs={tasbihs}
                        onSelect={selectTasbih}
                        onDelete={deleteTasbih}
                    />
                    <button
                        className="fab-add"
                        onClick={() => setIsAdding(true)}
                    >
                        +
                    </button>
                    <style>{`
            .fab-add {
              position: fixed;
              bottom: 2rem;
              right: 2rem;
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background: var(--primary-color);
              color: #0f172a;
              border: none;
              font-size: 2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
              cursor: pointer;
              transition: transform 0.2s;
              z-index: 10;
            }
            .fab-add:active {
              transform: scale(0.9);
            }
            @media (min-width: 481px) {
              .fab-add {
                position: absolute; /* relative to layout */
              }
            }
          `}</style>
                </>
            )}
        </Layout>
    );
}

export default App;
