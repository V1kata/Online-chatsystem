import { getSession } from "@/lib/authentication";

export const syncStorage = async (userData, setUserData) => {
    if (typeof window === "undefined") return;

    const localStorageData = localStorage.getItem("sb-mbzfehmethzunbrrpxls-auth-token");
    const sessionStorageData = sessionStorage.getItem("sb-mbzfehmethzunbrrpxls-auth-token");

    if (!localStorageData && !sessionStorageData) {
        window.location.href = "/login";
        return;
    }

    if (localStorageData) sessionStorage.setItem("sb-mbzfehmethzunbrrpxls-auth-token", localStorageData);
    if (sessionStorageData) localStorage.setItem("sb-mbzfehmethzunbrrpxls-auth-token", sessionStorageData);

    if (!userData) {
        const data = await getSession();
        if (data && data.length > 0) {
            setUserData(data[0]);
        }
    }
};
