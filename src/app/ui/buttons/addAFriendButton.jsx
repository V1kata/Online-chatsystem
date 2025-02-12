"use client";

import { useUser } from "@/app/context/UserContext";
import { sendFriendRequest } from "@/lib/dataHandlers";

export function AddAFriendButton({ receiverId, setUsers }) {
    const { userData } = useUser();
    const sendFriendRequestHandler = async (e, receiverId) => {
        try {
            await sendFriendRequest(userData.id, receiverId);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== receiverId));
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={(e) => sendFriendRequestHandler(e, receiverId)}>
            Add Friend
        </button>
    )
}