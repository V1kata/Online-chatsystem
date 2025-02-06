"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/setUp";
import { useUser } from "@/app/context/UserContext";

export function InputField({ chatId }) {
    const [data, setData] = useState('');
    const { userData } = useUser();

    const handleInputChange = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
        setData(e.target.value);
    };

    const sendMessage = async () => {
        if (!data.trim()) return;

        const { error } = await supabase.from("messages").insert([
            {
                chat: chatId,
                sender: userData.id,
                message: data.trim(),
                created_at: new Date().toISOString()
            }
        ]);

        if (error) {
            console.error("Error sending message:", error.message);
        } else {
            setData('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents adding a new line
            sendMessage();
        }
    };

    return (
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gray-300 rounded-b-lg flex items-center">
            <textarea
                id="message-input"
                className="w-full p-2 border rounded-md text-lg focus:outline-none resize-none overflow-y-auto max-h-[150px]"
                value={data}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows="1"
                placeholder="Type a message..."
            ></textarea>
            <button className="ml-3 hover:cursor-pointer hover:scale-110" onClick={sendMessage}>
                <Image src="/send-message-svgrepo-com.svg" className="w-10 h-10" alt="Send" width={10} height={10} />
            </button>
        </div>
    );
}
