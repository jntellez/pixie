"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { VscSave } from "react-icons/vsc"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { updateUserName } from "@/server/actions/auth"

type OptionCardProps = {
    item: {
        title: string;
        description: string;
        value: string;
        field: "name" | "email"
    };
};

export default function OptionCard({ item }: OptionCardProps) {
    const { title, description, value, field } = item;
    const [inputValue, setInputValue] = useState(value)
    const [loading, setLoading] = useState(false)
    const { update } = useSession()

    const hasChanged = inputValue !== value;

    const handleSave = async () => {
        if (!hasChanged || field === "email") return;

        try {
            setLoading(true);
            await updateUserName(inputValue);
            await update({ name: inputValue })

            toast({
                title: "Saved",
                description: `${title} has been updated.`,
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Error",
                description: `Failed to save ${title}.`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription className="text-md">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Input
                    type="text"
                    placeholder={field === "name" ? "Your name" : "Your email"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={field === "email"}
                />
            </CardContent>
            <CardFooter className="flex justify-end py-2 px-6 border-t-[1px] border-slate-200 dark:border-slate-800">
                <Button
                    variant="outline"
                    onClick={handleSave}
                    disabled={loading || field === "email" || !hasChanged}
                >
                    {loading ? (
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                        <VscSave className="mr-2" />
                    )}
                    Save
                </Button>
            </CardFooter>
        </Card>
    )
}
