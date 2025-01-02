import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
    return (
        <main class="relative z-10 flex justify-center items-center flex-col">
            <h1 class="text-white text-[50px] mb-12">Welcome to Viktor&#39;s chating app</h1>
            <div class="flex flex-row gap-12">
                <div class="border border-black p-3 rounded-xl shadow-[9px_11px_11px_3px_rgba(0,0,0,1)] bg-white">
                    <Link href="/login" class="text-black">
                        <div class="flex flex-row justify-center items-center gap-4">
                            <Image
                                src="/login-2-svgrepo-com.svg"
                                width={64}
                                height={64}
                                class="w-12 h-12"
                                alt='Login icon'
                            />
                            <p>Login</p>
                        </div>
                    </Link>
                </div>
                <div class="border border-black p-3 rounded-xl shadow-[9px_11px_11px_3px_rgba(0,0,0,1)] bg-white">
                    <Link href="/register" class="text-black">
                        <div class="flex flex-row justify-center items-center gap-4">
                            <Image src="/user-add-svgrepo-com.svg"
                                width={64}
                                height={64}
                                alt="Register icon"
                                class="w-12 h-12"
                            />
                            <p>Register</p>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    )
}