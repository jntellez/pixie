import { notFound, redirect } from "next/navigation"
import { db } from "@/server/utils/db"

export default async function RedirectPage(props: { params: Promise<{ shortUrl: string }> }) {
    const params = await props.params
    const { shortUrl } = params

    const link = await db.link.findUnique({
        where: { shortUrl },
    })

    if (!link) {
        notFound()
    }

    await db.link.update({
        where: { id: link.id },
        data: {
            clicks: { increment: 1 },
        },
    })

    redirect(link.url)
}
