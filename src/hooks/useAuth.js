    import { useEffect, useState } from "react";
    import { usePathname } from "next/navigation";
    import { syncStorage } from "@/utils/synchStorage";
    import { useUser } from "@/app/context/UserContext";
    import { refreshFriendRequestsAction } from "@/utils/refreshPageAction";

    export const useAuth = () => {
        const { userData, setUserData } = useUser();
        const pathname = usePathname();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            async function setUp() {
                await syncStorage(userData, setUserData);
                refreshFriendRequestsAction(pathname);
                setLoading(false);
            }
            setUp();
        }, []);

        return loading;
    };
