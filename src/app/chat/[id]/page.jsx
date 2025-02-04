export default function Page() {
    return (
        <div className="flex flex-col w-[55vw] overflow-y-auto h-screen bg-gray-200 bg-opacity-60 rounded-lg p-4">
            <div className="border-b border-white">
                <ul className="flex flex-row items-center gap-12 ml-7 p-3">
                    <li><a href="/chats"><img src="/arrow-back-svgrepo-com.svg" alt="" /></a></li>
                    <li className="text-2xl text-white">Viktor</li>
                    <li>
                        <button id="profile-button"
                            className="flex-end w-12 h-12 rounded-full bg-white-200 flex items-center justify-center hover:bg-gray-300 shadow-md transition-transform transform hover:scale-105">
                            <img src="/user-svgrepo-com.svg" alt="Profile" className="w-8 h-8" />
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col mt-5">
                    <div className="flex flex-row items-center justify-end mb-4">
                        <p
                            className="bg-white p-2 px-4 text-lg rounded-3xl rounded-br-[0px] shadow-md max-w-[45%] break-words">
                            Message</p>
                        <img src="/user-svgrepo-com.svg" alt=""
                            className="rounded-full w-12 h-12 bg-white p-2 ml-2" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center mb-4">
                        <img src="/user-svgrepo-com.svg" alt=""
                            className="rounded-full w-12 h-12 bg-white p-2 mr-2" />
                        <p
                            className="bg-white p-2 px-4 text-lg rounded-3xl rounded-bl-[0px] shadow-md max-w-[45%] break-words">
                            Answer message</p>
                    </div>
                </div>
            </div>
        </div>)
}