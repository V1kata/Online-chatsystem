"use client"

import { useUser } from "@/app/context/UserContext";
import { getAllUsers } from "@/lib/dataHandlers";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
    const { userData } = useUser();
    const [users, setUsers] = useState([]);

    useEffect(() => {     
        async function fetchUsers() {
            debugger
            const data = await getAllUsers(userData.email);
            setUsers(data);
        }
        fetchUsers();
    }, []);

    return (
        <>
            <div class="flex flex-col items-center space-y-2">
                <input
                    type="text"
                    id="friend-search"
                    placeholder="Search for a friend by username or email"
                    class="w-full max-w-[96%] p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                />
            </div>

            <div id="friends-list" class="mt-4 space-y-4">
                <ul class="flex flex-col gap-4">
                    {users && users.map((user) => (
                        <li key={user.id}
                            class="flex items-center justify-between gap-5 mx-5 bg-[rgba(199,195,195,0.641)] p-4 rounded-lg border border-white">
                            <div class="flex items-center gap-4">
                                <Image src={user.profileImageUrl} alt="User Avatar" width={100} height={100}
                                    className="profile-pic rounded-full w-30 h-30 bg-white p-2 object-cover"  />
                                <div class="flex flex-col gap-1 text-xl">
                                    <p class="name font-bold text-gray-800">{user.username}</p>
                                    <p class="last-text text-gray-600">{user.email}</p>
                                </div>
                            </div>
                            <button
                                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                Add Friend
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}