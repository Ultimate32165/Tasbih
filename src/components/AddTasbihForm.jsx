import React, { useState } from 'react';

export function AddTasbihForm({ onAdd, onCancel }) {
    const [formData, setFormData] = useState({
        arabic: '',
        transliteration: '',
        meaning: '',
        target: 33
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.transliteration) return;
        onAdd(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="add-form">
            <h3>Add New Tasbih</h3>

            <div className="form-group">
                <label>Arabic (Optional)</label>
                <input
                    type="text"
                    value={formData.arabic}
                    onChange={e => setFormData({ ...formData, arabic: e.target.value })}
                    placeholder="سُبْحَانَ ٱللَّٰهِ"
                    dir="rtl"
                />
            </div>

            <div className="form-group">
                <label>Transliteration / Name</label>
                <input
                    type="text"
                    value={formData.transliteration}
                    onChange={e => setFormData({ ...formData, transliteration: e.target.value })}
                    placeholder="SubhanAllah"
                    required
                />
            </div>

            <div className="form-group">
                <label>Meaning (Optional)</label>
                <input
                    type="text"
                    value={formData.meaning}
                    onChange={e => setFormData({ ...formData, meaning: e.target.value })}
                    placeholder="Glory be to Allah"
                />
            </div>

            <div className="form-group">
                <label>Target Count</label>
                <select
                    value={formData.target}
                    onChange={e => setFormData({ ...formData, target: Number(e.target.value) })}
                >
                    <option value={33}>33</option>
                    <option value={100}>100</option>
                    <option value={1000}>1000</option>
                    <option value={0}>Unlimited</option>
                </select>
            </div>

            <div className="form-actions">
                <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Add Tasbih</button>
            </div>

            <style>{`
        .add-form {
          background: var(--card-bg);
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .add-form h3 {
          margin: 0 0 0.5rem 0;
          color: var(--primary-color);
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.875rem;
          color: #94a3b8;
        }
        .form-group input, .form-group select {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem;
          border-radius: 8px;
          color: white;
          font-family: inherit;
        }
        .form-group input:focus {
          outline: 2px solid var(--primary-color);
          border-color: transparent;
        }
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .btn-primary, .btn-secondary {
          flex: 1;
          padding: 0.75rem;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-primary {
          background: var(--primary-color);
          color: #0f172a;
        }
        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-color);
        }
      `}</style>
        </form>
    );
}
