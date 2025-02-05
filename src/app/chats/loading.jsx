"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LoadingWrapper({ children }) {
    const loading = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        );
    }

    return <>{children}</>;
}
