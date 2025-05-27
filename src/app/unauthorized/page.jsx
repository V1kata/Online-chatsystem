"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Нямаш достъп</h1>
                <p className="text-gray-700 mb-6">
                    Изглежда се опитваш да достъпиш страница или чат, до който нямаш права.
                </p>
                <Link
                    href="/chats"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Обратно към чатовете
                </Link>
            </div>
        </div>
    );
}
