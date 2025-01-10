import { Logo } from "@/components/icons/logo";
import { ModeToggle } from "@/components/mode-toggle";
import UserMenu from "@/components/user-menu";
import Link from "next/link";

export default function Header() {
    return (
        <header className="dark:bg-slate-900 border-b-[1px] border-zinc-200 dark:border-slate-800">
            <div className="flex flex-row justify-between py-4 container">
                <div className="">
                    <Link href="/" className="flex flex-row items-center">
                        <Logo />
                        <h1 className="text-lg font-medium pl-2 text-black dark:text-white">Pixie</h1>
                    </Link>
                </div>
                <div className="flex flex-row items-center space-x-5">
                    <ModeToggle />
                    <UserMenu />
                </div>
            </div>
        </header>
    )
}