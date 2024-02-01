import React from 'react'
import Link from "next/link";
import { authUserSession } from "@/libs/auth-libs";

const UserActionButton = async () => {
    const user = await authUserSession();

    const actionLabel = user ? "Sign Out" : "Sign In"
    const actionURL = user ? "/api/auth/signout" : "/api/auth/signin" 

    return (
        <div className="flex justify-between gap-4 items-center">
            {
                user ? <Link href="/users/dashboard" className="text-lg px-2">Dashboard</Link> : null
            }
            <Link href={actionURL} className="bg-color-dark text-color-accent py-2 px-5 inline-block rounded-md">{actionLabel}</Link>
        </div>
    )
}

export default UserActionButton