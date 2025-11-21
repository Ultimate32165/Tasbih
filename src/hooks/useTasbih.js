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
        setTasbihs((prev) => [...prev, { ...newTasbih, id: Date.now().toString(), isCustom: true }]);
    };

    const deleteTasbih = (id) => {
        setTasbihs((prev) => prev.filter(t => t.id !== id));
        if (activeTasbihId === id) {
            setActiveTasbihId(null);
            setCount(0);
        }
    };

    const selectTasbih = (id) => {
        setActiveTasbihId(id);
        setCount(0);
    };

    const increment = () => {
        setCount((c) => c + 1);
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
        deleteTasbih,
        selectTasbih,
        increment,
        reset,
        setActiveTasbihId,
    };
}
