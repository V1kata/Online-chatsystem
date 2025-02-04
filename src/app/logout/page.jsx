"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { logoutUser } from "@/lib/authentication";

export default function Page() {
    const router = useRouter();
    const { userData, setUserData } = useUser();

    useEffect(() => {
        async function logout() {
            try {
                const res = await logoutUser(userData.id);

                if (res.error) {
                    throw res.error;
                }
                
                setUserData(null);
                router.push('/login');
            } catch(err) {
                return;
            }
        }
        logout();
    }, []);


    return <></>; 
}