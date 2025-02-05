import Image from "next/image";

export function UserChat({ message }) {
    return (<div className="flex flex-col mt-5">
        <div className="flex flex-row items-center justify-end mb-4">
            <p className="bg-white p-2 px-4 text-lg rounded-3xl rounded-br-[0px] shadow-md max-w-[45%] break-words">
                {message}
            </p>
            <Image src="/user-svgrepo-com.svg" alt="" className="rounded-full w-12 h-12 bg-white p-2 ml-2" width={12} height={12} />
        </div>
    </div>
    )
}