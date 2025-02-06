import Image from "next/image"

export function FriendChat({ message, user }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center mb-4">
                <Image src={user.profileImageUrl} alt="" className="rounded-full w-16 h-16 p-2 mr-2" width={48} height={48} />
                <p className="bg-white p-2 px-4 text-lg rounded-3xl rounded-bl-[0px] shadow-md max-w-[45%] break-words">
                    {message}
                </p>
            </div>
        </div>)
}