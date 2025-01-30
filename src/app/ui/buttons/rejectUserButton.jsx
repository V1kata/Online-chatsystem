export function RejectUserButton() {
    return (
        <button
            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-md">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" />
            </svg>
        </button>
    )
}