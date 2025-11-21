import { useState, useEffect } from 'react';
import { initialTasbihs } from '../data/tasbihs';

const STORAGE_KEY = 'tasbih_app_data';

export function useTasbih() {
    const [tasbihs, setTasbihs] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : initialTasbihs;
    });

    const [activeTasbihId, setActiveTasbihId] = useState(null);
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState({}); // { tasbihId: totalCount }

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasbihs));
    }, [tasbihs]);

    const addTasbih = (newTasbih) => {
        setTasbihs((prev) => [...prev, { ...newTasbih, id: Date.now().toString() }]);
    };

    const selectTasbih = (id) => {
        setActiveTasbihId(id);
        setCount(0); // Reset count on select? Or keep session? Let's reset for now.
    };

    const increment = () => {
        setCount((c) => c + 1);
        // Optional: Vibrate
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const reset = () => {
        setCount(0);
    };

    const activeTasbih = tasbihs.find((t) => t.id === activeTasbihId);

    return {
        tasbihs,
        activeTasbih,
        count,
        addTasbih,
        selectTasbih,
        increment,
        reset,
        setActiveTasbihId, // to go back
    };
}
