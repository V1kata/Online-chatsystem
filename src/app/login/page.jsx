"use client";
import { useRouter } from 'next/navigation';
import { LoginForm } from "@/app/ui/login-form";
export default function Page() {
    const router = useRouter();
    const handleSwitch = (e) => {
        router.push('/register');
    }

    return (
        <div id="auth-container"
            className="relative w-[700px] h-[450px] overflow-hidden bg-white rounded-lg shadow-2xl flex">
            <div id="auth-slider" className="flex w-[1400px] transition-transform duration-700 ease-in-out">
                <div className="w-[700px] flex">
                    <div className="w-1/2 flex flex-col justify-center items-center p-8">
                        <LoginForm />
                        <p className="mt-4 text-sm">Don&#39;t have an account? <button onClick={handleSwitch} className="text-blue-500 hover:underline">Register</button></p>
                    </div>
                    <div className="w-1/2 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/markus-spiske-6pflEeSzGUo-unsplash.jpg)',
                        }} />
                </div>
            </div>
        </div >
    );
}