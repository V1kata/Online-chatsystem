import '@/app/global.css';
import { UserProvider } from '@/app/context/UserContext';
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <UserProvider>
                <body
                    class="relative flex flex-col justify-center items-center min-h-screen z-[-1] bg-gradient-to-r from-blue-800 to-purple-900 overflow-hidden">
                    <div class="absolute inset-0 bg-opacity-50 backdrop-blur-lg z-0 z-[-1]"></div>

                    <div class="absolute top-10 left-20 w-20 h-20 bg-pink-500 opacity-30 rounded-full animate-float z-[-1]"></div>
                    <div
                        class="absolute top-40 right-32 w-24 h-24 bg-green-400 opacity-40 rounded-lg animate-float animation-delay-200 z-[-1]">
                    </div>
                    <div class="absolute bottom-32 left-48 w-16 h-16 bg-yellow-300 opacity-20 rounded-full animate-float z-[-1]"></div>
                    {children}
                </body>
            </UserProvider>
        </html >
    )
}