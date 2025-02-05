import Image from "next/image"

export function FriendChat({ message }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center mb-4">
                <Image src="/user-svgrepo-com.svg" alt="" className="rounded-full w-12 h-12 bg-white p-2 mr-2" width={12} height={12} />
                <p className="bg-white p-2 px-4 text-lg rounded-3xl rounded-bl-[0px] shadow-md max-w-[45%] break-words">
                    {message}
                </p>
            </div>
        </div>)
}