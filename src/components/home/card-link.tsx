import type { Link } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { LuCopy } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import ExternalLink from "@/components/ui/external-link"
import { getDateWithFormat, handleLinkOptionClick } from "@/lib/utils"

interface CardLinkProps {
    link: Link
}

export function CardLink({ link }: CardLinkProps) {
    const dateWithFormat = getDateWithFormat(link.createdAt)

    return (
        <div className="px-5 w-full xl:w-2/4">
            <Card>
                <CardContent className="flex flex-col gap-3 p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <ExternalLink
                                href={`${process.env.NEXT_PUBLIC_PAGE_URL}/${link.shortUrl}`}
                                className="flex items-center text-md text-black dark:text-white hover:underline"
                            >
                                <span>/</span>
                                <p>{link.shortUrl}</p>
                            </ExternalLink>
                            <Button
                                variant="ghost"
                                className="p-0 h-fit hover:bg-transparent hover:text-zinc-500 dark:hover:text-slate-300"
                                onClick={() => handleLinkOptionClick("copy", link)}
                            >
                                <LuCopy />
                            </Button>
                        </div>
                        <p className="text-xs text-slate-800 dark:text-slate-200">{link.clicks} clicks</p>
                    </div>

                    <div className="flex flex-row justify-between items-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400 break-all">{link.url}</p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">{dateWithFormat}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
