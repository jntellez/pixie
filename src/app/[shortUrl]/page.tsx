import { notFound, redirect } from "next/navigation";
import { db } from "@/server/utils/db";

type PageProps = {
    params: {
        shortUrl: string;
    };
};

export default async function RedirectPage({ params }: PageProps) {
    const { shortUrl } = params;

    const link = await db.link.findUnique({
        where: { shortUrl },
    });

    if (!link) {
        notFound();
    }

    await db.link.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } },
    });

    redirect(link.url);
}
