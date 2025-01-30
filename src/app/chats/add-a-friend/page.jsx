"use client"

import { useUser } from "@/app/context/UserContext";
import { getAllUsers, searchForUser } from "@/lib/dataHandlers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AddAFriendButton } from "@/app/ui/addAFriendButton";

export default function Page() {
    const { userData } = useUser();
    const [users, setUsers] = useState([]);
    const [inputData, setInputData] = useState(undefined);

    useEffect(() => {
        async function fetchUsers() {
            const data = await getAllUsers(userData?.email);
            setUsers(data);
        }
        fetchUsers();
    }, []);

    const handleSearch = async () => {
        if (!inputData) {
            let data = await getAllUsers(userData?.email);
            setUsers(data);
            return;
        };

        let newUsers = await searchForUser(inputData, userData.id);

        if (!newUsers) {
            setUsers([]);
            return
        };

        setUsers(newUsers);
    }

    return (
        <>
            <div className="flex flex-col items-center space-y-2 relative">
                <input
                    type="text"
                    id="friend-search"
                    placeholder="Search for a friend by username or email"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    className="w-full max-w-[96%] p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                />
                <button className="absolute right-4 scale-95 hover:scale-105 cursor-pointer mr-3"
                    style={{ "marginTop": "0" }}
                    onClick={handleSearch}>
                    <Image
                        src='/search-alt-1-svgrepo-com.svg'
                        width={50}
                        height={50} 
                        alt="Search Icon"
                    />
                </button>
            </div>

            <div id="friends-list" className="mt-4 space-y-4">
                <ul className="flex flex-col gap-4">
                    {users.length > 0 ? users.map((user) => (
                        <li key={user.id}
                            className="flex items-center justify-between gap-5 mx-5 bg-[rgba(199,195,195,0.641)] p-4 rounded-lg border border-white">
                            <div className="flex items-center gap-4">
                                <Image src={user.profileImageUrl} alt="User Avatar" width={100} height={100}
                                    className="profile-pic rounded-full w-30 h-30 p-2 object-cover" />
                                <div className="flex flex-col gap-1 text-xl">
                                    <p className="name font-bold text-gray-800">{user.username}</p>
                                    <p className="last-text text-gray-600">{user.email}</p>
                                </div>
                            </div>
                            <AddAFriendButton receiverId={user.id} />
                        </li>
                    )) : (<p className="text-center text-2xl z-10 top-1/2 left-1/2 -translate-x-1/2 absolute">No users found</p>)}
                </ul>
            </div>
        </>
    )
}