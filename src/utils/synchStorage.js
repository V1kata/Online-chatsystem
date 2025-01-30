import { getSession } from "@/lib/authentication";

export const syncStorage = async (userData, setUserData) => {
    if (typeof window !== 'undefined') {
        const localStorageData = localStorage.getItem('sb-mbzfehmethzunbrrpxls-auth-token');
        if (localStorageData) {
            sessionStorage.setItem('sb-mbzfehmethzunbrrpxls-auth-token', localStorageData);
        }

        const sessionStorageData = sessionStorage.getItem('sb-mbzfehmethzunbrrpxls-auth-token');
        if (sessionStorageData) {
            localStorage.setItem('sb-mbzfehmethzunbrrpxls-auth-token', sessionStorageData);
        }

        if (!localStorageData && !sessionStorageData) {
            window.location.href = '/login';
        }

        if (!userData) {
            const data = await getSession();
            setUserData(data[0]);
        }
    }
};