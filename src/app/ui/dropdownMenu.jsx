import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function DropdownMenu() {
    const router = useRouter();
    let onWhich = '';

    useEffect(() => {
        console.log(router.pathname);
    });
    
    return (
        <div class="relative">
            <button id="dropdown-toggle"
                class="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-300 shadow-md transition-transform transform hover:scale-105">
                <img src="/picklist-choice-svgrepo-com.svg" alt="Menu" class="w-8 h-8" />
            </button>
            <div id="dropdown-menu"
                class="absolute left-0 mt-2 hidden w-48 bg-white rounded-lg shadow-lg divide-y divide-gray-200">
                <a href="#" class={`block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg ${onWhich == 'profile' && 'bg-gray-400 cursor-default'}`}>Profile</a>
                <a href="#" class={`block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg ${onWhich == 'friendRequests' && 'bg-gray-400 cursor-default'}`}>Friend Requests</a>
                <a href="#" class={`block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg ${onWhich == 'allChats' && 'bg-gray-400 cursor-default'}`}>All chats</a>
            </div>
        </div>
    )
}