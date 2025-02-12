"use client";
import { useRouter } from 'next/navigation';
import { LoginForm } from "@/app/ui/forms/login-form";
export default function Page() {
    const router = useRouter();
    const handleSwitch = (e) => {
        router.push('/register');
    }

    return (
        <div id="auth-container"
            className="relative w-full sm:w-[700px] h-full overflow-hidden bg-white rounded-lg shadow-2xl flex flex-col md:flex-row md:min-h-[500px]">
            <div id="auth-slider" className="flex w-[1400px] transition-transform duration-700 ease-in-out">
                <div className="w-[700px] flex">
                    <div className="w-1/2 flex flex-col justify-center items-center p-8">
                        <LoginForm />
                        <p className="mt-4 text-sm">Don&#39;t have an account? <button onClick={handleSwitch} className="text-blue-500 hover:underline">Register</button></p>
                    </div>
                    <div className="w-1/2 bg-cover bg-center hidden md:block"
                        style={{
                            backgroundImage: 'url(/markus-spiske-6pflEeSzGUo-unsplash.jpg)',
                        }} />
                </div>
            </div>
        </div >
    );
}