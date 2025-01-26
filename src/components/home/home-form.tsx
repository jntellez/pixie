"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateLinkSchema } from "../../../server/schemas"
import { TbLink } from "react-icons/tb";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link"

export function HomeForm() {
    const form = useForm<z.infer<typeof CreateLinkSchema>>({
        resolver: zodResolver(CreateLinkSchema),
        defaultValues: {
            url: "",
            shortUrl: Math.random().toString(36).substring(2, 10),
            description: "",
        },
    })

    function onSubmit(data: z.infer<typeof CreateLinkSchema>) {
        console.log(data)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-6 w-full md:w-3/4 lg:w-2/4">
            <p className="scroll-m-20 pb-2 text-2xl text-center font-semibold tracking-tight first:mt-0">Paste the url you want to shorten</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full xl:w-2/4 px-6 space-y-6">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="https://" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between space-x-4">
                        <Button className="w-full" variant="outline" type="submit"><TbLink />Short Link</Button>
                        <Link
                            href="/dashboard"
                            className={buttonVariants({
                                variant: "default",
                                className: "w-full",
                            })}
                        ><FiArrowRight />Sign In</Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}
