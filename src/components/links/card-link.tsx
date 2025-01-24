import type { Link } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { LuCopy } from "react-icons/lu";
import { RiMoreFill } from "react-icons/ri";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FiEdit } from "react-icons/fi";
import { IoLinkOutline } from "react-icons/io5";
import { LuQrCode } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";

export const linkOptions = [
    { title: "Edit", icon: FiEdit, className: "" },
    { title: "Copy short link", icon: IoLinkOutline, className: "" },
    { title: "Copy QR code", icon: LuQrCode, className: "" },
    { title: "Delete", icon: MdOutlineDelete, className: "text-red-600" },
];

interface CardLinkProps {
    link: Link;
}

export function CardLink({ link }: CardLinkProps) {
    const dateWithFormat = new Date(link.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    })

    return (
        <Card>
            <CardContent className="flex flex-col gap-2 p-5">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <a
                            href={link.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-md text-zinc-500 dark:text-slate-500 hover:underline"
                        >
                            <p>{link.shortUrl}</p>
                        </a>
                        <LuCopy />
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-xs">{link.clicks} clicks</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <RiMoreFill size={18} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {linkOptions.map((option, index) => (
                                    <DropdownMenuItem key={index} className={option.className}>
                                        <option.icon />
                                        {option.title}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
                <p className="text-sm">{link.url}</p>
                <div className="flex flex-row justify-between items-center">
                    <p className="text-xs">{link.description}</p>
                    <p className="text-xs">{dateWithFormat}</p>
                </div>
            </CardContent>
        </Card>
    );
}

