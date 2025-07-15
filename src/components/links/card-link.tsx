"use client"

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
import { LuQrCode } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "../ui/button";
import ExternalLink from "../ui/external-link";
import { getDateWithFormat, handleLinkOptionClick } from "@/lib/utils";
import { useState } from "react";
import { EditLinkModal } from "./edit-link";
import { DeleteLinkModal } from "./delete-link";

export const linkOptions = [
    { title: "Edit", icon: FiEdit, className: "", type: "edit" },
    { title: "Copy short link", icon: LuCopy, className: "", type: "copy" },
    { title: "Copy QR code", icon: LuQrCode, className: "", type: "qr" },
    { title: "Delete", icon: MdOutlineDelete, className: "text-red-600", type: "delete" },
] as const

interface CardLinkProps {
    link: Link;
}

export function CardLink({ link }: CardLinkProps) {
    const dateWithFormat = getDateWithFormat(link.createdAt)
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleOptionClick = async (type: string) => {
        if (type === "edit") {
            setEditOpen(true);
        } else if (type === "delete") {
            setDeleteOpen(true);
        } else {
            await handleLinkOptionClick(type, link);
        }
    };

    return (
        <Card>
            <CardContent className="flex flex-col gap-2 p-5">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <ExternalLink
                            href={`${process.env.NEXT_PUBLIC_PAGE_URL}/${link.shortUrl}`}
                            className="flex items-center text-md text-black dark:text-white hover:underline"
                        >
                            <span>/</span>
                            <p>{link.shortUrl.split('/').slice(-1)}</p>
                        </ExternalLink>
                        <Button
                            variant="ghost"
                            className="p-0 h-fit hover:bg-transparent hover:text-zinc-500 dark:hover:text-slate-300"
                            onClick={() => handleLinkOptionClick("copy", link)}
                        >
                            <LuCopy />
                        </Button>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-xs text-slate-800 dark:text-slate-200">{link.clicks} clicks</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <RiMoreFill size={18} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {linkOptions.map((option, index) => (
                                    <DropdownMenuItem key={index} className={option.className} onClick={() => handleOptionClick(option.type)}>
                                        <option.icon />
                                        {option.title}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                            <EditLinkModal
                                open={editOpen}
                                onOpenChange={setEditOpen}
                                link={link}
                            />
                            <DeleteLinkModal
                                open={deleteOpen}
                                onOpenChange={setDeleteOpen}
                                linkId={link.id}
                            />
                        </DropdownMenu>

                    </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{link.url}</p>
                <div className="flex flex-row justify-between items-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{link.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{dateWithFormat}</p>
                </div>
            </CardContent>
        </Card>
    );
}

