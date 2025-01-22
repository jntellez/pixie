"use client"

import {
    Card,
    CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RxDashboard } from "react-icons/rx"
import { PiListBulletsBold } from "react-icons/pi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils"

export default function ViewMode() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentViewMode = searchParams.get("view") || "grid";

    const handleClick = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set("view", term);
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Card className="rounded-md">
            <CardContent className="flex p-1 space-x-1">
                <Button
                    variant="ghost"

                    onClick={() => handleClick("grid")}
                    className={cn("w-[25px] h-[25px] flex items-center justify-center p-0 rounded-sm",
                        currentViewMode === "grid" && "bg-slate-200 dark:bg-slate-800"
                    )}>
                    <RxDashboard className="text-black dark:text-white" />
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => handleClick("list")}
                    className={cn("w-[25px] h-[25px] flex items-center justify-center p-0 rounded-sm",
                        currentViewMode === "list" && "bg-slate-200 dark:bg-slate-800"
                    )}>
                    <PiListBulletsBold
                        className="text-black dark:text-white"
                    />
                </Button>
            </CardContent>
        </Card>
    )
}
