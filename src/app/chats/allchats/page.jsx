"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { getFriends } from "@/lib/dataHandlers";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    const { userData } = useUser();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const data = await getFriends(userData.id);
            setFriends(data);
        }
        fetchUsers();
    }, [])
    return (
        <>
            <article className="flex flex-col gap-12">
                {friends.length > 0 ? friends.map((friend) => (
                    <div key={friend.id}
                        className="flex items-center justify-between gap-5 mx-5 bg-[rgba(199,195,195,0.641)] p-4 rounded-lg border border-white">
                        <div className="flex items-center gap-4">
                            <Image
                                src={friend.user1.profileImageUrl}
                                alt="User Avatar"
                                width={100}
                                height={100}
                                priority
                                className="profile-pic rounded-full w-30 h-30 p-2"
                            />
                            <div className="flex flex-col gap-1 text-xl">
                                <div className="flex flex-row gap-2">
                                    <p className="name font-bold text-gray-800">{friend.user1.username}</p>
                                    <p>-</p>
                                    <p className="name font-bold text-gray-800">{friend.user1.email}</p>
                                </div>
                                <p className="last-text text-gray-600">{"No messages yet"}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-white text-xl">12:50</p>
                            <div
                                className="bg-[#e58b8f] text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-purple-700 shadow-md">
                                <p className="text-sm">2</p>
                            </div>
                        </div>
                    </div>)) : (
                    <div className="flex justify-center items-center h-screen">
                        <p className="text-xl font-semibold">You still have no friends, why not add one? - <Link href="/chats/add-a-friend">Add a friend</Link></p>
                    </div>
                )}
            </article>
        </>
    )
}