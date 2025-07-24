"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdOutlineDelete } from "react-icons/md";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "@/hooks/use-toast";
import { deleteAccount } from "@/server/actions/auth";
import { useState, useTransition } from "react"
import { signOut, useSession } from "next-auth/react";

export default function DeleteAccountDialog() {
    const { data: session } = useSession();
    const [emailInput, setEmailInput] = useState("");
    const [isPending, startTransition] = useTransition();

    const isEmailCorrect = emailInput === session?.user?.email;

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteAccount();
                toast({
                    title: "Account deleted",
                    description: "Your account has been successfully removed.",
                });
                signOut({ callbackUrl: "/" })
            } catch (error) {
                toast({
                    title: "Failed to delete account",
                    description: "Something went wrong while deleting your account.",
                });
                console.error(error);
            }
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-fit border-red-500 dark:border-red-800 text-red-500 dark:text-red-800 hover:text-red-600 hover:bg-white dark:hover:bg-slate-950"
                >
                    <MdOutlineDelete />
                    Delete Account
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        By deleting your account you will lose all saved links
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 space-y-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">To continue, enter your email:</Label>
                        <Input
                            id="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            disabled={isPending}
                        />
                    </div>
                </div>
                <DialogFooter className="flex gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isPending}>Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={handleDelete}
                        disabled={!isEmailCorrect || isPending}
                        variant="outline"
                        className="border-red-500 dark:border-red-800 text-red-500 dark:text-red-800 hover:text-red-600 hover:bg-white dark:hover:bg-slate-950"
                    >
                        <MdOutlineDelete />
                        Delete Account
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}