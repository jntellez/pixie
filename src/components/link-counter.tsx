'use client'

import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { getUserLinkCount } from "@/server/actions/links";

export function LinkCounter() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [count, setCount] = useState<number | null>(null);
    const [, startTransition] = useTransition();

    useEffect(() => {
        if (!session?.user || !pathname.startsWith("/dashboard")) {
            setCount(null);
            return;
        }

        startTransition(() => {
            getUserLinkCount()
                .then(setCount)
                .catch(() =>
                    toast({
                        title: "Error",
                        description: "Failed to load link count.",
                        variant: "destructive",
                    })
                );
        });
    }, [session, pathname]);

    if (!pathname.startsWith("/dashboard") || count === null) return null;

    return (
        <div className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
            {count}/12
        </div>
    );
}
