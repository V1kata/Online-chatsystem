"use client"
import { registerUser } from "@/lib/authentication";
import { useUser } from "@/app/context/UserContext";

export function RegisterForm({ onSuccess }) {
    const { setUserData } = useUser();
    async function signIn(formData) {
        try {
            const data = await registerUser(Object.fromEntries(formData));
            setUserData(data);
            onSuccess();
        } catch (err) {
            console.error(err);
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
            <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Register</button>
        </form>
    )
}

