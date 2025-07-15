"use client";

import { useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteLink } from "@/server/actions/links";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface DeleteLinkModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    linkId: string;
}

export function DeleteLinkModal({ open, onOpenChange, linkId }: DeleteLinkModalProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteLink(linkId);
                toast({
                    title: "Link deleted",
                    description: "The link has been removed.",
                });
                onOpenChange(false);
            } catch (err) {
                toast({
                    title: "Error",
                    description: (err as Error).message,
                });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete this link?</DialogTitle>
                    <DialogDescription>
                        This action is permanent and cannot be undone.
                        Your short link and all associated data will be permanently removed.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
                        {isPending ? (
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                            "Delete"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
