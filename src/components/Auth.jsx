import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export function Auth({ onCancel }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
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
        // Sign Up Logic
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        });

        if (error) throw error;

        // Attempt to create a profile record if the table exists
        // This is "best effort" - if it fails (e.g. table doesn't exist), we just continue
        // The user might need to create the table manually for username login to work later
        if (data?.user) {
          try {
            await supabase.from('profiles').insert({
              id: data.user.id,
              username: username,
              email: email
            });
          } catch (profileError) {
            console.warn('Could not create profile record:', profileError);
          }
        }

        setMessage('Account created! Please check your email to verify your account, then sign in.');
        setIsSignUp(false);
        if (error) throw error;
        // Login successful
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
            <label className="input-label">
              {isSignUp ? 'Username' : 'Username or Email'}
            </label>
            <input
              type="text"
              placeholder={isSignUp ? "Choose a username" : "Enter username or email"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
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
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage('');
            }}
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
        .input-label {
            display: block;
            color: var(--text-muted);
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
            margin-left: 0.25rem;
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
          margin-top: 1rem;
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
