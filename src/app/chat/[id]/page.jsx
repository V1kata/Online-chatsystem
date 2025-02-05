"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";
import Image from "next/image";
import { InputField } from '@/app/ui/chat/inputField';

export default function Page({ params }) {
    const [chat, setChat] = useState([]);
    let chatId = '';
    const { userData, setUserData } = useUser();
    
    useEffect(() => {
        async function getId() {
            const { id } = await params
            chatId = id;
        }

        getId();
        async function getFirstMessages() {
            const data = await getFirstMessages(chatId);
            setChat(data)
        }   
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

            </div>

            <InputField />
        </div>
    )
}