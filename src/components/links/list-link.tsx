"use client"

import { Link } from "@prisma/client";
import { linkOptions } from "@/components/links/card-link";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import ExternalLink from "../ui/external-link";
import { getDateWithFormat, handleLinkOptionClick } from "@/lib/utils";
import { useState } from "react";
import { EditLinkModal } from "./edit-link";
import { DeleteLinkModal } from "./delete-link";

interface ListLinkProps {
    link: Link;
}

export function ListLink({ link }: ListLinkProps) {
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
            <CardContent className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] p-5 gap-4 items-center">
                <div>
                    <ExternalLink
                        href={`${process.env.NEXT_PUBLIC_PAGE_URL}/${link.shortUrl}`}
                        className="text-md text-black dark:text-white hover:underline"
                    >
                        <span>/</span>
                        {link.shortUrl.split("/").slice(-1)}
                    </ExternalLink>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{link.url}</p>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{link.description}</p>

                <p className="text-xs text-slate-800 dark:text-slate-200">{link.clicks} clicks</p>

                <p className="text-xs text-slate-500 dark:text-slate-400">{dateWithFormat}</p>

                <div className="flex gap-2 justify-center items-center">
                    {linkOptions.map((option, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${option.className}`}
                            onClick={() => handleOptionClick(option.type)}
                        >
                            <option.icon size={18} />
                        </Button>
                    ))}
                </div>
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
            </CardContent>
        </Card>

    );
}
