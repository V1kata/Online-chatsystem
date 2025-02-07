import '@/app/global.css';
import { UserProvider } from '@/app/context/UserContext';
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <UserProvider>
                <body className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-purple-900">
                    <div className="absolute inset-0 bg-opacity-50 backdrop-blur-lg z-[-1]"></div>

                    <div className="absolute top-10 left-5 sm:left-20 w-16 sm:w-20 h-16 sm:h-20 bg-pink-500 z-[-1] opacity-30 rounded-full animate-float"></div>
                    <div className="absolute top-40 right-8 sm:right-32 w-20 sm:w-24 h-20 sm:h-24 bg-green-400 opacity-40 z-[-1] rounded-lg animate-float animation-delay-200"></div>
                    <div className="absolute bottom-16 sm:bottom-32 left-12 sm:left-48 w-12 sm:w-16 h-12 sm:h-16 bg-yellow-300 opacity-20 z-[-1] rounded-full animate-float"></div>
                    <main className='relative z-10 flex justify-center items-center flex-col w-full'>
                        {children}
                    </main>
                </body>
            </UserProvider>
        </html >
    )
}