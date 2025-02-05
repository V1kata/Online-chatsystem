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
                await logoutUser(userData.id);
                
                router.push('/login');
                setUserData(null);
            } catch(err) {
                return;
            }
        }
        logout();
    }, []);


    return <></>; 
}