import { Logo } from "@/components/icons/logo";
import ThemeToggle from "@/components/layout/header/theme-toggle";
import UserMenu from "@/components/layout/header/user-menu";
import Link from "next/link";

export default function Header() {
    return (
        <header className="dark:bg-zinc-900">
            <div className="flex flex-row justify-between py-4 container">
                <div className="">
                    <Link href="/" className="flex flex-row items-center">
                        <Logo />
                        <h1 className="text-lg font-medium pl-2 text-black dark:text-white">Pixie</h1>
                    </Link>
                </div>
                <div className="flex flex-row items-center space-x-5">
                    <ThemeToggle />
                    <UserMenu />
                </div>
            </div>
        </header>
    )
}