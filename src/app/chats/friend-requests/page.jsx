"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { viewFriendRequest } from "@/lib/dataHandlers";
import { AddUserButton } from "@/app/ui/buttons/addUserButton";
import { RejectUserButton } from "@/app/ui/buttons/rejectUserButton";
import Image from "next/image";
import { timeAgo } from "@/utils/timeAgo";

export default function Page() {
    const { userData } = useUser();
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const data = await viewFriendRequest(userData?.id);
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
                                <p className="text-xs text-gray-500 italic">Sent {timeAgo(person['created_at'])}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <AddUserButton />
                            <RejectUserButton />
                        </div>
                    </div>
                )) : <p className="text-center text-2xl z-10 top-1/2 left-1/2 -translate-x-1/2 absolute">No users found</p>}
            </article>
        </>
    )
}