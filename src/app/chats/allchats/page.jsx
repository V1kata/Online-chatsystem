export default function Page() {
    return (
        <>
            <article className="flex flex-col gap-12">
                <div
                    className="flex items-center justify-between gap-5 mx-5 bg-[rgba(199,195,195,0.641)] p-4 rounded-lg border border-white">
                    <div className="flex items-center gap-4">
                        <img src="/user-svgrepo-com.svg" alt="User Avatar"
                            className="profile-pic rounded-full w-15 h-15 bg-white p-2" />
                        <div className="flex flex-col gap-2">
                            <p className="text-xl font-medium text-gray-800">John Doe</p>
                            <p className="text-sm text-gray-600">Sent you a friend request</p>
                            <p className="text-xs text-gray-500 italic">Sent 2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="w-16 h-16 bg-green-500 hover:bg-green-600 hover:shadow-2xl rounded-full flex items-center justify-center shadow-md">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13L9 17L19 7" stroke="white" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button
                            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-md">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6L18 18M6 18L18 6" stroke="white" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </article>
        </>
    )
}