"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import { InputField } from "@/app/ui/chat/inputField";
import { getMessages } from "@/lib/dataHandlers";
import { getCurrentUser } from "@/lib/authentication";
import { FriendChat } from "@/app/ui/chat/friendChat";
import { UserChat } from "@/app/ui/chat/userChat";
import { timeAgo } from "@/utils/timeAgo";
import { supabase } from "@/lib/setUp";

export default function Page() {
    const loading = useAuth();
    const [chat, setChat] = useState([]);
    const [friend, setFriend] = useState({});
    const pathname = usePathname();
    const chatId = pathname.split("/")[2];
    const { userData } = useUser();

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);

    useEffect(() => {
        async function getFirstMessages() {
            const data = await getMessages(chatId);
            const res = await getCurrentUser(pathname.split("/")[3]);
            setFriend(res[0]);
            setChat(data);
        }

        getFirstMessages();

        const channel = supabase.channel(`chat:${chatId}`).on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "messages", filter: `chat=eq.${chatId}` },
            (payload) => {
                console.log("New message received:", payload.new);
                setChat((prev) => [...prev, payload.new]);
            }
        ).subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, [chatId]);

    useEffect(() => {
        if (!isUserScrolledUp) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [chat]);

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            setIsUserScrolledUp(scrollHeight - scrollTop > clientHeight + 50); // 50px threshold
        }
    };

    return (
        <div className="flex flex-col w-[55vw] overflow-hidden h-screen bg-gray-200 bg-opacity-60 rounded-lg p-4">
            <div className="border-b border-white">
                <ul className="flex flex-row items-center justify-between gap-12 ml-7 p-3">
                    <div className="flex flex-row items-center gap-10">
                        <li>
                            <Link href="/chats">
                                <Image src="/arrow-back-svgrepo-com.svg" priority alt="Arrow back" width={50} height={50} />
                            </Link>
                        </li>
                        <div className="flex flex-col">
                            <li className="text-2xl text-white">{friend?.username}</li>
                            <li className="text-xs text-white">{friend.isOnline ? "Online" : `Last seen ${timeAgo(friend.lastOnline)}`}</li>
                        </div>
                    </div>
                    <li className="ml-auto">
                        <button id="profile-button" className="w-12 h-12 rounded-full bg-white-200 flex items-center justify-center hover:bg-gray-300 shadow-md transition-transform transform hover:scale-105">
                            <Image src={friend.profileImageUrl || "/user-svgrepo-com.svg"} alt="Profile" className="w-12 h-12 rounded-full" width={36} height={36} />
                        </button>
                    </li>
                </ul>
            </div>

            <div ref={chatContainerRef} onScroll={handleScroll} className="flex flex-col gap-2 flex-grow overflow-y-auto pb-20 mt-5">
                {chat.length > 0 &&
                    chat.map((message) =>
                        message.sender === userData?.id ? (
                            <UserChat key={message.id} message={message.message} />
                        ) : (
                            <FriendChat key={message.id} message={message.message} user={friend} />
                        )
                    )}
                <div ref={messagesEndRef} />
            </div>

            <InputField chatId={chatId} />
        </div>
    );
}
