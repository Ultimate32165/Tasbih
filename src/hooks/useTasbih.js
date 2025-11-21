import { useState, useEffect } from 'react';
import { initialTasbihs } from '../data/tasbihs';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'tasbih_app_data';

export function useTasbih() {
    const [user, setUser] = useState(null);
    const [tasbihs, setTasbihs] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : initialTasbihs;
    });

    const [activeTasbihId, setActiveTasbihId] = useState(null);
    const [count, setCount] = useState(0);

    // Load user session
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Sync with Supabase when user logs in
    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            // 1. Fetch Custom Tasbihs
            const { data: customTasbihs } = await supabase
                .from('user_tasbihs')
                .select('*');

            if (customTasbihs) {
                setTasbihs([...initialTasbihs, ...customTasbihs.map(t => ({ ...t, isCustom: true }))]);
            }

            // 2. Fetch Counts (we'll load this when selecting a tasbih, or pre-load all? Pre-load is better for list view if we show counts there)
            // For now, we only need count for the active one.
        };

        fetchData();
    }, [user]);

    // Persist to LocalStorage (Guest Mode)
    useEffect(() => {
        if (!user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasbihs));
        }
    }, [tasbihs, user]);

    const addTasbih = async (newTasbih) => {
        if (user) {
            const { data, error } = await supabase
                .from('user_tasbihs')
                .insert([{ ...newTasbih, user_id: user.id, is_custom: true }])
                .select()
                .single();

            if (data && !error) {
                setTasbihs((prev) => [...prev, { ...data, isCustom: true }]);
            }
        } else {
            setTasbihs((prev) => [...prev, { ...newTasbih, id: Date.now().toString(), isCustom: true }]);
        }
    };

    const deleteTasbih = async (id) => {
        if (user) {
            const { error } = await supabase
                .from('user_tasbihs')
                .delete()
                .eq('id', id);

            if (!error) {
                setTasbihs((prev) => prev.filter(t => t.id !== id));
            }
        } else {
            setTasbihs((prev) => prev.filter(t => t.id !== id));
        }

        if (activeTasbihId === id) {
            setActiveTasbihId(null);
            setCount(0);
        }
    };

    const selectTasbih = async (id) => {
        setActiveTasbihId(id);

        if (user) {
            // Fetch count from DB
            const { data } = await supabase
                .from('tasbih_counts')
                .select('count')
                .eq('tasbih_id', id)
                .single();

            setCount(data?.count || 0);
        } else {
            // Local storage logic for counts could be improved, but for now we reset or keep in memory
            // The original code reset count on select. Let's keep it simple for guest.
            // Actually, let's try to persist guest counts in a separate object if we want, 
            // but the prompt asked for sync. Guest behavior can remain simple.
            setCount(0);
        }
    };

    const increment = async () => {
        const newCount = count + 1;
        setCount(newCount);
        if (navigator.vibrate) navigator.vibrate(50);

        if (user && activeTasbihId) {
            // Debounce or just fire? Fire for now, Supabase is fast. 
            // Optimistic update is already done via setCount.
            await supabase
                .from('tasbih_counts')
                .upsert({
                    user_id: user.id,
                    tasbih_id: activeTasbihId,
                    count: newCount,
                    updated_at: new Date().toISOString()
                });
        }
    };

    const reset = async () => {
        setCount(0);
        if (user && activeTasbihId) {
            await supabase
                .from('tasbih_counts')
                .upsert({
                    user_id: user.id,
                    tasbih_id: activeTasbihId,
                    count: 0,
                    updated_at: new Date().toISOString()
                });
        }
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
        user // Expose user to App
    };
}
