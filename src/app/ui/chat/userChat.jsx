
import { useUser } from "@/app/context/UserContext";
import Image from "next/image";

export function UserChat({ message }) {
    const { userData } = useUser();

    return (
        <div className="flex flex-col mt-5">
            <div className="flex flex-row items-center justify-end mb-4">
                <p className="bg-white p-2 px-4 text-lg rounded-3xl rounded-br-[0px] shadow-md max-w-[45%] break-words">
                    {message}
                </p>
                <Image src={userData?.profileImageUrl} alt="" className="rounded-full w-16 h-16 p-2 ml-2" width={48} height={48} />
            </div>
        </div>
    )
}