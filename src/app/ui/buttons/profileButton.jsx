import Link from "next/link"
import Image from "next/image"

export function ProfileButton() {

    return (
        <Link href={"/profile"}>
            <button id="profile-button"
                className="w-12 h-12 mr-5 rounded-full bg-white flex items-center justify-center hover:bg-gray-300 shadow-md transition-transform transform hover:scale-105">
                <Image src="/user-svgrepo-com.svg" alt="Profile" width={8} height={8} className="w-8 h-8" />
            </button>
        </Link>
    )
}