"use client";
import { registerUser } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
    let [step, setStep] = useState(1);
    const router = useRouter();
    const handleSwitch = (e) => {
        router.push('/login');
    }
    
    async function signIn(formData) {
        console.log(formData)
        try {
            // await registerUser();
            setStep(2);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div id="auth-container"
            className="relative w-[700px] h-[450px] overflow-hidden bg-white rounded-lg shadow-2xl flex">
            <div id="auth-slider" className="flex w-[1400px] transition-transform duration-700 ease-in-out">
                <div class="w-[700px] flex">
                    <div className="w-1/2 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/registerImg.webp)',
                        }} />
                    <div className="w-1/2 flex flex-col justify-center items-center p-8">
                        {step === 1 && (<form action={signIn}>
                            <h2 className="text-2xl font-semibold mb-6">Register</h2>
                            <input type="email" placeholder="Email" className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
                            <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
                            <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Register</button>
                        </form>)}
                        {step === 2 && (
                            <form>
                                <h2 className="text-2xl font-semibold mb-6">Complete Your Profile</h2>
                                <input type="text"
                                    placeholder="Username"
                                    className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
                                <input type="text"
                                    placeholder="Profile Image URL"
                                    className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
                                <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save Profile</button>
                            </form>)}
                        <p className="mt-4 text-sm">Already have an account? <button onClick={handleSwitch} className="text-blue-500 hover:underline">Login</button></p>
                    </div>
                </div>
            </div>
        </div >

    );
}