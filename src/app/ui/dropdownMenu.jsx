import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const links = [
    { title: "All chats", path: "/chats/allchats" },
    { title: "Friend Requests", path: "/chats/friend-requests" },
    { title: "Add a friend", path: "/chats/add-a-friend" },
    { title: "Profile", path: "/profile" },
    { title: "Logout", path: "/logout" },
]
export function DropdownMenu() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const closeDropdown = (event) => {
        if (!dropdownRef.current?.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeDropdown);
        return () => document.removeEventListener("mousedown", closeDropdown);
    }, []);

    return (
        <div className="relative z-10" ref={dropdownRef}>
            <button
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={toggleDropdown}
                className="ml-5 w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-300 shadow-md transition-transform transform hover:scale-105"
            >

                <Image
                    src="/picklist-choice-svgrepo-com.svg"
                    alt="Menu"
                    width={8}
                    height={8}
                    className="w-8 h-8"
                    loading="lazy"
                />
            </button>

            <div
                className={clsx(
                    "absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg divide-y divide-gray-300 transform transition-all duration-500 ease-in-out",
                    {
                        "opacity-100 scale-100": isOpen,
                        "opacity-0 scale-95 pointer-events-none": !isOpen
                    }
                )}
            >
                {links.map((link) => (
                <Link key={link.title} href={link.path} className={clsx("block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg",
                    { 'bg-red-400 hover:cursor-default rounded-none pointer-events-none': pathname === link.path }
                )}>
                    {link.title}
                </Link>
            ))}
            </div>
        </div>
    );
}
