"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";
import Image from "next/image";
import { InputField } from '@/app/ui/chat/inputField';
import { getMessages } from '@/lib/dataHandlers'
import { FriendChat } from '@/app/ui/chat/friendChat';
import { UserChat } from '@/app/ui/chat/userChat';

export default function Page({ params }) {
    const [chat, setChat] = useState([]);
    const pathname = usePathname();
    let chatId = pathname.split('/')[2];
    const { userData, setUserData } = useUser();
    
    useEffect(() => {
        async function getFirstMessages() {
            const data = await getMessages(chatId);
            setChat(data)
        }

        getFirstMessages()
    })

    return (
        <div className="flex flex-col w-[55vw] overflow-y-auto h-screen bg-gray-200 bg-opacity-60 rounded-lg p-4">
            <div className="border-b border-white">
                <ul className="flex flex-row items-center gap-12 ml-7 p-3">
                    <li><Link href="/chats"><Image src="/arrow-back-svgrepo-com.svg" alt="" width={50} height={50} /></Link></li>
                    <li className="text-2xl text-white">banana</li>
                    <li>
                        <button id="profile-button" className="flex-end w-12 h-12 rounded-full bg-white-200 flex items-center justify-center hover:bg-gray-300 shadow-md transition-transform transform hover:scale-105">
                            <Image src="/user-svgrepo-com.svg" alt="Profile" className="w-8 h-8" width={8} height={8} />
                        </button>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-2 flex-grow overflow-y-auto pb-20">
                {chat && chat.map((message) => (
                    message.sender.id === userData.id ? <UserChat key={message.id} message={message.message} /> : <FriendChat key={message.id} message={message.message} />
                ))}
            </div>

            <InputField />
        </div>
    )
}