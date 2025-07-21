"use client";

import { useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { associateLinkToUser } from "@/server/actions/links";

export function ClientAssociateLink() {
    const { data: session } = useSession();
    const [_isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!session?.user) return;

        const pendingLink = localStorage.getItem("short_url");
        if (!pendingLink) return;

        startTransition(() => {
            associateLinkToUser(pendingLink)
                .then(() => {
                    localStorage.removeItem("short_url");
                })
                .catch((err) => {
                    console.error("Failed to associate link", err);
                });
        });
    }, [session]);

    return null;
}
