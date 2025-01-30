"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { RegisterForm } from "@/app/ui/forms/register-form"
import { ProfileForm } from "@/app/ui/forms/profile-form"

export default function Page() {
    const [step, setStep] = useState(1)
    const router = useRouter()

    const handleSwitch = () => {
        router.push("/login")
    }

    return (
        <div
            id="auth-container"
            className="relative w-[700px] h-[450px] overflow-hidden bg-white rounded-lg shadow-2xl flex">
            <div id="auth-slider" className="flex w-[1400px] transition-transform duration-700 ease-in-out">
                <div className="w-[700px] flex">
                    <div
                        className="w-1/2 bg-cover bg-center"
                        style={{
                            backgroundImage: "url(/registerImg.webp)",
                        }}
                    />
                    <div className="w-1/2 flex flex-col justify-center items-center p-8">
                        {step === 1 && <RegisterForm onSuccess={() => setStep(2)} />}
                        {step === 2 && <ProfileForm />}
                        <p className="mt-4 text-sm">
                            Already have an account?{" "}
                            <button onClick={handleSwitch} className="text-blue-500 hover:underline">
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

