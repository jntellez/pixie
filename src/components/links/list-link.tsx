import { Link } from "@prisma/client";
import { linkOptions } from "@/components/links/card-link";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface ListLinkProps {
    link: Link;
}

export function ListLink({ link }: ListLinkProps) {
    const dateWithFormat = new Date(link.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    });

    return (
        <Card>
            <CardContent className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] p-5 gap-4 items-center">
                <div>
                    <a
                        href={link.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md text-black dark:text-white hover:underline"
                    >
                        <span>/</span>
                        {link.shortUrl.split("/").slice(-1)}
                    </a>
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
                        >
                            <option.icon size={18} />
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>

    );
}
