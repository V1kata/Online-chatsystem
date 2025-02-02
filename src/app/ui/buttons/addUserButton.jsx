"use client";
import { useTransition } from "react";
import { acceptFriendRequest } from "@/lib/dataHandlers";
import { refreshFriendRequestsAction } from "@/utils/refreshPageAction";

export function AddUserButton({ sender_id, userData, setUserData, setPeople }) {
    const [isPending, startTransition] = useTransition();

    const acceptFriendRequestHandler = async (e) => {
        e.stopPropagation();

        userData.acceptedFriends.push(sender_id);

        try {
            const data = await acceptFriendRequest(userData.acceptedFriends, sender_id, userData.id);
            setUserData(data);

            setPeople((prev) => prev.filter(person => person.sender_id.id !== sender_id));

            startTransition(() => {
                refreshFriendRequestsAction('/chats/friend-requests');
            });

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button onClick={acceptFriendRequestHandler}
            className="w-16 h-16 bg-green-500 hover:bg-green-600 hover:shadow-2xl rounded-full flex items-center justify-center shadow-md">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" />
            </svg>
        </button>
    );
}
