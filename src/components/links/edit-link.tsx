"use client";

import { useActionState, useEffect } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { editLink, State as LinkState } from "@/server/actions/links";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Link } from "@prisma/client";
import { VscSave } from "react-icons/vsc";
import { Label } from "@/components/ui/label";

interface EditLinkModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    link: Link | null;
}

const initialState: LinkState = {};

export function EditLinkModal({ open, onOpenChange, link }: EditLinkModalProps) {
    const [state, formAction, pending] = useActionState(editLink, initialState);

    useEffect(() => {
        if (state?.success) {
            toast({
                title: "Link updated!",
                description: "Your link has been successfully updated.",
            });
            onOpenChange(false);
        }
    }, [state, onOpenChange]);

    if (!link) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Link</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="grid gap-4 py-4">

                    <input type="hidden" name="id" value={link.id} />

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="url">Long Url</Label>
                        <Input
                            name="url"
                            defaultValue={link.url}
                            placeholder="https://"
                        />
                        {state?.errors?.url && (
                            <p className="text-sm text-red-600">{state.errors.url[0]}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="shortUrl">Short Url</Label>
                        <Input
                            name="shortUrl"
                            defaultValue={link.shortUrl}
                            placeholder="short-link"
                        />
                        {state?.errors?.shortUrl && (
                            <p className="text-sm text-red-600">{state.errors.shortUrl[0]}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            name="description"
                            defaultValue={link.description || ""}
                            placeholder="Optional description"
                        />
                    </div>

                    <DialogFooter className="gap-y-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={pending}>
                            {pending ? (
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            ) : (
                                <VscSave className="mr-2" />
                            )}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
