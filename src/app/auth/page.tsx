import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Logo } from "@/components/icons/logo"
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center h-[calc(100vh-4.4rem)] font-[family-name:var(--font-geist-sans)]">
            <Card className="w-[350px] mb-[280px]">
                <div className="inline-block ml-6 mt-6 mb-[-18px]">
                    <Logo />
                </div>
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="flex items-center gap-2 text-2xl">Log In</CardTitle>
                    <CardDescription>Log in with your preferred option:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 justify-center text-center">
                    <Button variant="outline" className="w-full"><FcGoogle />Log in with Google</Button>
                    <div className="flex items-center justify-center space-x-2 mt-6">
                        <div className="border-t-[1px] border-slate-300 dark:border-slate-700 flex-grow"></div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">or</p>
                        <div className="border-t-[1px] border-slate-300 dark:border-slate-700 flex-grow"></div>
                    </div>
                    <Button variant="outline" className="w-full"><IoLogoGithub />Log in with GitHub</Button>
                </CardContent>
            </Card>
        </main>
    )
}
