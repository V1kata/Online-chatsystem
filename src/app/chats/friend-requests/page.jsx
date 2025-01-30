"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import { viewFriendRequest } from "@/lib/dataHandlers";

export default function Page() {
    const { userData } = useUser();
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const data = await viewFriendRequest(userData.id);
            debugger
            setPeople(data);
        }
        fetchUsers();
    }, []);

    return (
        <>
            <article className="flex flex-col space-y-4">
                {people.length > 0 ? people.map((person) => (
                    <div key={person.id}
                        className="flex items-center justify-between gap-5 mx-5 bg-[rgba(199,195,195,0.641)] p-4 rounded-lg border border-white">
                        <div className="flex items-center gap-4">
                            <Image 
                                src={person['sender_id'].profileImageUrl}
                                alt="User Avatar"
                                width={100}
                                height={100}
                                className="profile-pic rounded-full w-30 h-30 p-2"
                            />
                            <div className="flex flex-col gap-2">
                                <p className="text-xl font-medium text-gray-800">{person['sender_id'].email}</p>
                                <p className="text-sm text-gray-600">Sent you a friend request</p>
                                <p className="text-xs text-gray-500 italic">Sent 2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="w-16 h-16 bg-green-500 hover:bg-green-600 hover:shadow-2xl rounded-full flex items-center justify-center shadow-md">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-md">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )) : <p class="text-center text-2xl z-10 top-1/2 left-1/2 -translate-x-1/2 absolute">No users found</p>}
            </article>
        </>
    )
}