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
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { Textarea } from "../ui/textarea";
import { GiDwarfFace } from "react-icons/gi";
import { useActionState, useEffect, useRef, useState } from "react";
import { createLink, State as LinkState } from "@/server/actions/links"
import { nanoid } from "nanoid";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const initialState: LinkState = {}

export default function CreateLink() {
    const [state, formAction, pending] = useActionState(createLink, initialState)
    const [open, setOpen] = useState(false)

    const shortUrlRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (state?.success) {
            toast({
                title: "Link created!",
                description: "Your short link has been successfully created.",
            })
            setOpen(false)
        }
    }, [state])

    const generateShortUrl = () => {
        if (shortUrlRef.current) {
            shortUrlRef.current.value = nanoid(6)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <GiDwarfFace className="hidden sm:block" />
                    <span className="hidden sm:block">Create Link</span>
                    <span className="block sm:hidden">Add</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Link</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="grid gap-4 py-4">

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="url">Long Url</Label>
                        <Input
                            name="url"
                            placeholder="https://"
                            defaultValue={state?.fields?.url || ""}
                        />
                        {state?.errors?.url && (
                            <p className="text-sm text-red-600">{state.errors.url[0]}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="shortUrl">Short Url</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                name="shortUrl"
                                ref={shortUrlRef}
                                placeholder="short-link"
                                defaultValue={state?.fields?.shortUrl || ""}
                            />
                            <Button type="button" variant="outline" className="px-3" onClick={generateShortUrl}>
                                <GiPerspectiveDiceSixFacesRandom />
                                <span>Generate</span>
                            </Button>
                        </div>
                        {state?.errors?.shortUrl && (
                            <p className="text-sm text-red-600">{state.errors.shortUrl[0]}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            name="description"
                            placeholder="Type short link description here (optional)"
                            defaultValue={state?.fields?.description || ""}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={pending}>
                            {pending ? (
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            ) : (
                                <GiDwarfFace className="mr-2" />
                            )}
                            Create Link
                        </Button>
                    </DialogFooter>
                    {state?.message && !state.success && (
                        <p className="text-sm text-red-600 text-right -mt-2">{state.message}</p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
