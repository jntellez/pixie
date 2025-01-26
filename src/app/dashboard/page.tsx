import { CardLink } from "@/components/links/card-link";
import { ListLink } from "@/components/links/list-link";
import { cn } from "@/lib/utils";

export default async function DashboardPage(props: {
    searchParams?: Promise<{
        query?: string;
        sort?: string;
        view?: string;
    }>;
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ''
    const sort = searchParams?.sort || 'date'
    const view = searchParams?.view || 'grid'

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

const links = [
    {
        id: "ckxz1q2p80001xk7y2z9y3a0f",
        url: "https://example.com/blog/1",
        shortUrl: "https://short.ly/abc123",
        description: "Blog post about web development.",
        createdAt: new Date("2025-01-01T10:00:00Z"),
        userId: "user1",
        clicks: 34,
    },
    {
        id: "ckxz1q2p80002xk7y2z9y3a1f",
        url: "https://example.com/news/2",
        shortUrl: "https://short.ly/xyz456",
        description: "Latest tech news article.",
        createdAt: new Date("2025-01-02T12:30:00Z"),
        userId: "user2",
        clicks: 120,
    },
    {
        id: "ckxz1q2p80003xk7y2z9y3a2f",
        url: "https://example.com/product/1",
        shortUrl: "https://short.ly/prod789",
        description: "Check out this awesome product!",
        createdAt: new Date("2025-01-03T09:15:00Z"),
        userId: "user3",
        clicks: 89,
    },
    {
        id: "ckxz1q2p80004xk7y2z9y3a3f",
        url: "https://example.com/tutorial/3",
        shortUrl: "https://short.ly/tut321",
        description: "Learn how to code in Python.",
        createdAt: new Date("2025-01-04T14:45:00Z"),
        userId: "user4",
        clicks: 47,
    },
    {
        id: "ckxz1q2p80005xk7y2z9y3a4f",
        url: "https://example.com/resource/4",
        shortUrl: "https://short.ly/res654",
        description: "Free resources for designers.",
        createdAt: new Date("2025-01-05T11:00:00Z"),
        userId: "user5",
        clicks: 73,
    },
    {
        id: "ckxz1q2p80006xk7y2z9y3a5f",
        url: "https://example.com/contact",
        shortUrl: "https://short.ly/contactus",
        description: "Get in touch with us.",
        createdAt: new Date("2025-01-06T16:20:00Z"),
        userId: "user6",
        clicks: 15,
    },
];
