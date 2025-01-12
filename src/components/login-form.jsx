import Link from "next/link";

export default function LoginForm() {
  return (
    <div id="auth-container"
      className="relative w-[700px] h-[450px] overflow-hidden bg-white rounded-lg shadow-2xl flex">
      <div id="auth-slider" className="flex w-[1400px] transition-transform duration-700 ease-in-out">
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <input type="text" placeholder="Email" className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
          <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded-md focus:outline-none" />
          <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</button>
          <p className="mt-4 text-sm">Don&#39;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link></p>
        </div>
      </div>
    </div>
  );
}