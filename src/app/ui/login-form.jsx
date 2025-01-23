"use client"
import { loginUser } from "@/lib/authentication";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from 'next/navigation';

export function LoginForm({ onSuccess }) {
    const { setUserData } = useUser();
    const router = useRouter();
    async function login(formData) {
        try {
            const data = await loginUser(Object.fromEntries(formData));
            setUserData(data);
            router.push('/allchats');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form action={login}>
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <input type="text" placeholder="Email" name="email" className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
            <input type="password" placeholder="Password" name="password" className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</button>
        </form>
    )
}

