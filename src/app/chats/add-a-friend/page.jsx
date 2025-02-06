"use client"

import { useUser } from "@/app/context/UserContext";
import { getAllUsers } from "@/lib/dataHandlers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AddAFriendButton } from "@/app/ui/buttons/addAFriendButton";
import { Search } from "@/app/ui/search";

export default function Page() {
    const { userData } = useUser();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const data = await getAllUsers(userData?.email);
            setUsers(data);
        }
        fetchUsers();
    }, []);

    return (
        <>
            <Search setUsers={setUsers} />

            <div id="friends-list" className="mt-4 space-y-4">
                <ul className="flex flex-col gap-4">
                    {users.length > 0 ? users.map((user) => (
                        <li key={user.id}
                            className="flex items-center justify-between gap-5 mx-0 md:mx-5 bg-[rgba(199,195,195,0.641)] p-4 rounded-lg border border-white">
                            <div className="flex items-center gap-4 w-full">
                                <Image src={user.profileImageUrl} alt="User Avatar" width={100} height={100} priority
                                    className="profile-pic rounded-full w-30 h-30 p-2 object-cover" />
                                <div className="flex flex-col md:flex-row xl:items-center justify-between w-full">
                                    <div className="flex flex-col gap-1 text-md md:text-xl">
                                        <p className="name font-bold text-gray-800">{user.username}</p>
                                        <p className="font-bold text-gray-800 truncate w-32 md:w-auto">{user.email}</p>
                                    </div>
                                    <AddAFriendButton receiverId={user.id} />
                                </div>
                            </div>

                        </li>
                    )) : (<p className="text-center text-2xl z-10 top-1/2 left-1/2 -translate-x-1/2 absolute">No users found</p>)}
                </ul>
            </div>
        </>
    )
}