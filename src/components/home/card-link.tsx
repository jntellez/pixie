// components/card-link.tsx
import type { Link } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { LuCopy } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import ExternalLink from "@/components/ui/external-link"

interface CardLinkProps {
    link: Link
}

export function CardLink({ link }: CardLinkProps) {
    const [copied, setCopied] = useState(false)

    const dateWithFormat = new Date(link.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    })

    const handleCopy = async () => {
        const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${link.shortUrl}`
        await navigator.clipboard.writeText(fullUrl)
        setCopied(true)

        toast({
            title: "Copied!",
            description: fullUrl,
        })

        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="px-5 w-full xl:w-2/4">
            <Card>
                <CardContent className="flex flex-col gap-3 p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <ExternalLink
                                href={`/${link.shortUrl}`}
                                className="flex items-center text-md text-black dark:text-white hover:underline"
                            >
                                <span>/</span>
                                <p>{link.shortUrl}</p>
                            </ExternalLink>
                            <Button
                                variant="ghost"
                                className="p-0 h-fit hover:bg-transparent hover:text-zinc-500 dark:hover:text-slate-300"
                                onClick={handleCopy}
                            >
                                <LuCopy className={copied ? "text-green-500" : ""} />
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
