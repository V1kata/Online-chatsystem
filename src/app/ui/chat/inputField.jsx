"use client";

import { useState } from "react";
import Image from "next/image";

export function InputField() {
    const [data, setData] = useState('');

    const handleInputChange = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
        setData(e.target.value);
    }

    return (
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gray-300 rounded-b-lg flex items-center">
            <textarea id="message-input"
                className="w-full p-2 border rounded-md text-lg focus:outline-none resize-none overflow-y-auto max-h-[150px]"
                value={data} onChange={handleInputChange}
                rows="1" placeholder="Type a message..."></textarea>
            <button className="ml-3 hover:cursor-pointer hover:scale-110">
                <Image src="/send-message-svgrepo-com.svg" className="w-10 h-10" alt="Send" width={10} height={10} />
            </button>
        </div>
    )
}