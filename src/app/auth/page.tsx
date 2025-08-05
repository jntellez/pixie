"use client"

import * as React from "react"
import { useState } from "react"
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
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null)

    const handleLogin = (provider: "google" | "github") => {
        setLoadingProvider(provider)
        signIn(provider, { callbackUrl: "/dashboard" })
    }

    return (
        <main className="flex items-center justify-center h-[calc(100vh-10rem)] font-[family-name:var(--font-geist-sans)]">
            <Card className="w-[350px] mb-[280px]">
                <div className="inline-block ml-6 mt-6 mb-[-18px]">
                    <Logo />
                </div>
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="flex items-center gap-2 text-2xl">Log In</CardTitle>
                    <CardDescription>Log in with your preferred option:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 justify-center text-center">

                    <Button
                        variant="outline"
                        onClick={() => handleLogin("google")}
                        className="w-full"
                        disabled={loadingProvider !== null}
                    >
                        {loadingProvider === "google" ? (
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                            <FcGoogle className="mr-2" />
                        )}
                        Log in with Google
                    </Button>

                    <div className="flex items-center justify-center space-x-2 mt-6">
                        <div className="border-t-[1px] border-slate-300 dark:border-slate-700 flex-grow"></div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">or</p>
                        <div className="border-t-[1px] border-slate-300 dark:border-slate-700 flex-grow"></div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => handleLogin("github")}
                        className="w-full"
                        disabled={loadingProvider !== null}
                    >
                        {loadingProvider === "github" ? (
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                            <IoLogoGithub className="mr-2" />
                        )}
                        Log in with GitHub
                    </Button>

                </CardContent>
            </Card>
        </main>
    )
}
