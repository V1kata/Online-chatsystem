"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { logoutUser } from "@/lib/authentication";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        async function logout() {
            await logoutUser();
            router.push('/login');
        }
        logout();
    }, []);


    return <></>; 
}