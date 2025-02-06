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
            className="relative w-full sm:w-[700px] h-full overflow-hidden bg-white rounded-lg shadow-2xl flex flex-col md:flex-row md:min-h-[500px]">
            <div id="auth-slider" className="flex w-[1400px] transition-transform duration-700 ease-in-out">
                <div className="w-[700px] flex">
                    <div
                        className="w-1/2 bg-cover bg-center hidden md:block"
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

