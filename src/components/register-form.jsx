import Link from "next/link";

export default function RegisterForm() {
    return (
        <div id="auth-container"
            class="relative w-[700px] h-[450px] overflow-hidden bg-white rounded-lg shadow-2xl flex">
            <div id="auth-slider" class="flex w-[1400px] transition-transform duration-700 ease-in-out">
                <div className="w-1/2 flex flex-col justify-center items-center p-8">
                    <h2 className="text-2xl font-semibold mb-6">Register</h2>
                    <input type="text" placeholder="Name" className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
                    <input type="email" placeholder="Email" className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
                    <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
                    <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Register</button>
                    <p className="mt-4 text-sm">Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link></p>
                </div>
            </div>
        </div >
    );
}