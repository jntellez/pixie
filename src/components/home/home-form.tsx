"use client"

import { useActionState, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FiArrowRight } from "react-icons/fi"
import { TbLink } from "react-icons/tb"
import { createPublicLink, State as LinkState } from "@/server/actions/links"
import { CardLink } from "./card-link"
import { Link as LinkType } from "@prisma/client"
import { getLinkByShortUrl } from "@/server/data/links"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const initialState: LinkState = {
    message: null,
    errors: {},
    shortUrl: undefined,
}

export function HomeForm() {
    const [state, formAction] = useActionState(createStoragedLink, initialState)
    const [link, setLink] = useState<LinkType | null>(null)
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const loadStoredLink = async () => {
            const shortUrl = localStorage.getItem("short_url")
            if (!shortUrl) return

            const dbLink = await getLinkByShortUrl(shortUrl)
            setLink(dbLink)
        }

        loadStoredLink()
    }, [])

    async function createStoragedLink(prevState: LinkState, formData: FormData) {
        const result = await createPublicLink(prevState, formData)

        if (result.shortUrl) {
            localStorage.setItem("short_url", result.shortUrl)
            const dbLink = await getLinkByShortUrl(result.shortUrl)
            setLink(dbLink)
        }

        return result
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-6 w-full md:w-3/4 lg:w-2/4">
            <p className="pb-2 text-2xl text-center font-semibold">Paste the URL you want to shorten</p>

            <form action={formAction} className="w-full xl:w-2/4 px-6 space-y-6">
                <div>
                    <Input name="url" placeholder="https://" />
                    {state?.errors?.url && (
                        <p className="text-red-700 text-sm mt-2">{state.errors.url[0]}</p>
                    )}
                </div>

                <div className="flex justify-between space-x-4">
                    <Button className="w-full" variant="outline" type="submit">
                        <TbLink /> Short Link
                    </Button>
                    <Button
                        variant="default"
                        className="w-full"
                        onClick={() => session?.user ? router.push("/dashboard") : router.push("/auth")}
                    >
                        <FiArrowRight /> Sign In
                    </Button>
                </div>
            </form>

            {link && <CardLink link={link} />}
        </div>
    )
}
