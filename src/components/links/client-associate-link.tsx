"use client";

import { useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { associateLinkToUser } from "@/server/actions/links";
import { toast } from "@/hooks/use-toast";

export function ClientAssociateLink() {
    const { data: session } = useSession();
    const [, startTransition] = useTransition();

    useEffect(() => {
        if (!session?.user) return;

        const pendingLink = localStorage.getItem("short_url");
        if (!pendingLink) return;

        startTransition(() => {
            associateLinkToUser(pendingLink)
                .then((res) => {
                    if (res?.success) {
                        toast({
                            title: "Link saved to your account",
                            description: "You can now access it from your dashboard.",
                        });
                        localStorage.removeItem("short_url");
                    } else {
                        toast({
                            title: "Link not saved",
                            description: res?.message || "You have reached your link limit.",
                            variant: "destructive",
                        });
                    }
                })
                .catch((err) => {
                    console.error("Failed to associate link", err);
                    toast({
                        title: "Error saving link",
                        description: "Something went wrong. Please try again later.",
                        variant: "destructive",
                    });
                });
        });
    }, [session]);

    return null;
}