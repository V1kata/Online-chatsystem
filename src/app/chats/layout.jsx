import { DropdownMenu } from "@/app/ui/dropdownMenu";
import { PageTitle } from "@/app/ui/pageTitle";
import { ProfileButton } from "@/app/ui/buttons/profileButton";
import LoadingWrapper from "@/app/chats/loading";

export default function Layout({ children }) {
    return (
        <LoadingWrapper>
            <div className="flex flex-col w-full md:w-[55vw] between:w-[70vw] overflow-y-auto h-screen bg-gray-200 bg-opacity-60 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between mb-4 relative">
                    <DropdownMenu />

                    <PageTitle />

                    <ProfileButton />
                </div>
                {children}
            </div>
        </LoadingWrapper>
    )
}