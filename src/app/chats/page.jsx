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
            let arr = [];
            
            data.map(({ id, user1, user2, lastMessage }) => {
                let savedUser = user1.id === userData.id ? user2 : user1;
                arr.push({ id, user: savedUser, lastMessage: lastMessage || "No messages yet" });
            });
            setFriends(arr);
        }
        fetchUsers();
    }, [])
    return (
        <>
            <article className="flex flex-col gap-6 md:gap-12">
                {friends.length > 0 ? friends.map((friend) => (
                    <Link key={friend.id} href={`/chat/${friend.id}/${friend.user.id}`}>
                        <div
                            className="flex items-center justify-between gap-5 mx-0 md:mx-5 bg-[rgba(199,195,195,0.641)] p-4 rounded-lg border border-white">
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Image
                                    src={friend.user.profileImageUrl}
                                    alt="User Avatar"
                                    width={100}
                                    height={100}
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="profile-pic rounded-full p-2"
                                />
                                <div className="flex flex-col md:flex-row w-full md:justify-between">
                                    <div className="flex flex-col gap-1 text-md md:text-xl">
                                        <div className="flex flex-col md:flex-row gap-2">
                                            <p className="name font-bold text-gray-800">{friend.user.username}</p>
                                            <p className="hidden md:block">-</p>
                                            <p className="font-bold text-gray-800 truncate w-32 md:w-auto">{friend.user.email}</p>
                                        </div>
                                        <p className="last-text text-gray-600">Last message - {friend.lastMessage}</p> {/* TODO: Add last message */}
                                    </div>
                                    <div className="flex flex-row md:flex-col items-center gap-2">
                                        <p className="text-white text-xl">12:50</p>
                                        <div
                                            className="bg-[#e58b8f] text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-purple-700 shadow-md">
                                            <p className="text-sm">2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>)) : (
                    <div className="flex justify-center items-center h-screen">
                        <p className="text-xl font-semibold">You still have no friends, why not add one? - <Link href="/chats/add-a-friend">Add a friend</Link></p>
                    </div>
                )}
            </article>
        </>
    )
}