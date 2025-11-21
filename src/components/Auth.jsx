import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export function Auth({ onCancel }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage('Check your email for the confirmation link!');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Login successful, parent component will handle state change via listener
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                <p className="subtitle">Sync your tasbihs across devices</p>

                <form onSubmit={handleAuth}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {message && <div className="message">{message}</div>}

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    <button
                        className="link-btn"
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                    <button className="link-btn cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>

            <style>{`
        .auth-container {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }
        .auth-card {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 24px;
          width: 100%;
          max-width: 360px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5);
        }
        h2 {
          margin: 0;
          color: var(--primary-color);
          text-align: center;
        }
        .subtitle {
          text-align: center;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        input {
          width: 100%;
          padding: 1rem;
          border-radius: 12px;
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-family: inherit;
          box-sizing: border-box;
        }
        input:focus {
          outline: 2px solid var(--primary-color);
          border-color: transparent;
        }
        .btn-primary {
          width: 100%;
          padding: 1rem;
          border-radius: 12px;
          background: var(--primary-color);
          color: #0f172a;
          border: none;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
        }
        .message {
          padding: 0.75rem;
          background: rgba(52, 211, 153, 0.1);
          color: var(--primary-color);
          border-radius: 8px;
          font-size: 0.9rem;
          text-align: center;
        }
        .auth-footer {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: center;
        }
        .link-btn {
          background: none;
          border: none;
          color: var(--text-color);
          cursor: pointer;
          font-size: 0.9rem;
          opacity: 0.8;
        }
        .link-btn:hover {
          opacity: 1;
        }
        .cancel {
          color: var(--text-muted);
        }
      `}</style>
        </div>
    );
}
