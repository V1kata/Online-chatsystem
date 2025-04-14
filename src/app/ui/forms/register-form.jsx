"use client"
import { registerUser } from "@/lib/authentication";
import { useUser } from "@/app/context/UserContext";
import { useState } from "react";

export function RegisterForm({ onSuccess }) {
    const { setUserData } = useUser();
    const [error, setError] = useState(null);
    async function signIn(formData) {
        try {
            const data = await registerUser(Object.fromEntries(formData));

            if (data.error) {
                throw new Error(data.error);
            }

            setUserData(data);
            onSuccess();
        } catch (err) {
            setError(err.message.split(':')[1].trim());
            return;
        }
    }

    return (
        <form action={signIn}>
            <h2 className="text-2xl font-semibold mb-6">Register</h2>
            <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full mb-4 p-2 border rounded-md focus:outline-none"
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full mb-4 p-2 border rounded-md focus:outline-none"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Register</button>
        </form>
    )
}

