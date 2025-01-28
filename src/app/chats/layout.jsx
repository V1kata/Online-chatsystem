"use client"

import { DropdownMenu } from "@/app/ui/dropdownMenu";
import { PageTitle } from "@/app/ui/pageTitle";
import { ProfileButton } from "@/app/ui/profileButton";

export default function Layout({ children }) {
    return <>
        <div class="flex flex-col w-[55vw] overflow-y-auto h-screen bg-gray-200 bg-opacity-60 rounded-lg p-4 space-y-4">
            <div class="flex items-center justify-between mb-4 relative">
                <DropdownMenu />

                <PageTitle />

                <ProfileButton />
            </div>
            {children}</div>
    </>
}