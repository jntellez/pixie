import { auth } from "@/auth";
import { CardLink } from "@/components/links/card-link";
import { EmptyLinks } from "@/components/links/empty-links";
import { ListLink } from "@/components/links/list-link";
import { cn } from "@/lib/utils";
import { getUserLinks } from "@/server/data/links";
import { redirect } from "next/navigation";

export default async function DashboardPage(props: {
    searchParams?: Promise<{
        query?: string;
        sort?: string;
        view?: string;
    }>;
}) {
    const session = await auth()
    if (!session?.user) {
        redirect("/auth")
    }

    const searchParams = await props.searchParams
    const query = searchParams?.query || ''
    const sort = searchParams?.sort || 'date'
    const view = searchParams?.view || 'grid'

    const links = await getUserLinks()

    const filteredLinks = links.filter(link => {
        if (query !== '') {
            const lowerCaseQuery = query.toLowerCase()
            return link.shortUrl.toLowerCase().includes(lowerCaseQuery)
                || link.url.toLowerCase().includes(lowerCaseQuery)
                || link.description.toLowerCase().includes(lowerCaseQuery)
        }
        return link
    }).sort((a, b) => {
        if (sort === 'clicks') {
            return b.clicks - a.clicks;
        }
        else if (sort === 'shortLink') {
            return a.shortUrl.localeCompare(b.shortUrl);
        }
        return 0;
    })

    if (links.length === 0) return <EmptyLinks />

    return (
        <div className={cn("grid container grid-cols-1 gap-4",
            view === 'grid' && 'sm:grid-cols-2 lg:grid-cols-3'
        )}>
            {filteredLinks.map((link) => view === 'grid'
                ? <CardLink key={link.id} link={link} />
                : <ListLink key={link.id} link={link} />)}
        </div>
    )
}
