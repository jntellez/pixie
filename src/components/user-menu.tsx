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

export default function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/jntellez.png" />
                    <AvatarFallback>J</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {"jntellez"}
                        </p>
                        <p className="text-xs leading-none text-zinc-400 dark:text-slate-400">
                            {"juantellez916@gmail.com"}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <GoHome />
                    <span>Home</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <RxDashboard />
                    <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <RiSettings4Line />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <TbBrandGithub />
                    <span>View project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <PiBugBeetle />
                    <span>Report a bug</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <TbLogout />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}