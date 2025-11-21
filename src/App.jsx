+
                    </button >
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
        </Layout >
    );
}

export default App;
