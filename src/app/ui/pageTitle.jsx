"use client";

import { toTitleCase } from "@/utils/helper";
import { usePathname } from "next/navigation"

export function PageTitle() {
    const pathname = usePathname();

    return (
        <h2 className="text-2xl font-semibold text-center">{toTitleCase(pathname)}</h2>
    )
}