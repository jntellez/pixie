import { redirect } from "next/navigation"
import { db } from "@/server/utils/db"

type Props = {
    params: {
        shortUrl: string
    }
}

export default async function RedirectPage({ params }: Props) {
    const shortUrl = params.shortUrl

    const link = await db.link.findUnique({
        where: { shortUrl },
    })

    if (!link) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-semibold text-red-600">
                    Link not found 😢
                </h1>
            </div>
        )
    }

    await db.link.update({
        where: { id: link.id },
        data: {
            clicks: { increment: 1 },
        },
    })

    redirect(link.url)
}
