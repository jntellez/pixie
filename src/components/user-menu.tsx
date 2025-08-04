"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { RiSettings4Line } from "react-icons/ri";
import { TbBrandGithub } from "react-icons/tb";
import { PiBugBeetle } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import ExternalLink from "./ui/external-link";

export default function UserMenu() {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "loading") {
        return <Avatar className="h-8 w-8">
            <AvatarFallback />
        </Avatar>
    }

    if (!session?.user) {
        return (
            <Button onClick={() => router.push("/auth")}>
                Sign In
            </Button>
        )
    }

    const user = session?.user

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user?.name || "Unknown User"}
                        </p>
                        <p className="text-xs leading-none text-zinc-400 dark:text-slate-400">
                            {user?.email || "No email"}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/">
                        <GoHome />
                        <span>Home</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                        <RxDashboard />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">
                        <RiSettings4Line />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <ExternalLink href="https://github.com/jntellez/pixie">
                        <TbBrandGithub />
                        <span>View project</span>
                    </ExternalLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <ExternalLink href="https://github.com/jntellez/pixie/issues/new">
                        <PiBugBeetle />
                        <span>Report a bug</span>
                    </ExternalLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
                    <TbLogout />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}