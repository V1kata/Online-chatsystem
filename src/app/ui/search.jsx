"use client";

import { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { getAllUsers, searchForUser } from "@/lib/dataHandlers";
import Image from "next/image";

export function Search({ setUsers }) {
    const { userData } = useUser();
    const [inputData, setInputData] = useState(undefined);
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
    )
}