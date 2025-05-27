"use client";
import { useEffect } from 'react';
import { supabase } from '@/lib/setUp';
import { useUser } from '@/app/context/UserContext';

export default function OnlineStatusUpdater() {
    const { userData } = useUser();

    useEffect(() => {
        if (!userData) return;

        const updateOnlineStatus = async (isOnline) => {
            await supabase
                .from('user_profiles')
                .update({
                    isOnline: isOnline,
                    lastOnline: isOnline ? null : new Date().toISOString(),
                })
                .eq('id', userData.id);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState == 'hidden') {
                updateOnlineStatus(false);
            } else if (document.visibilityState == 'visible') {
                updateOnlineStatus(true);
            }
        };

        updateOnlineStatus(true);

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            updateOnlineStatus(false);
        };
    }, [userData]);

    return null;
}
