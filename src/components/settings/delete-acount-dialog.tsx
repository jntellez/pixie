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

export default function DeleteAccountDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-fit border-red-500 dark:border-red-800 text-red-500 dark:text-red-800 hover:text-red-600 hover:bg-white dark:hover:bg-slate-950">
                    <MdOutlineDelete />
                    Delete Account
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription className="text-slate-400">By deleting your account you will lose all saved links</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 space-y-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">To continue enter your email:</Label>
                        <Input
                            id="email"
                            placeholder=""
                        />
                    </div>
                </div>
                <DialogFooter className="flex gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="outline" className="border-red-500 dark:border-red-800 text-red-500 dark:text-red-800 hover:text-red-600 hover:bg-white dark:hover:bg-slate-950">
                        <MdOutlineDelete />
                        Delete Account
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
