import CreateLink from "@/components/links/create-link";
import SortLinks from "@/components/links/sort-links";
import SearchLink from "@/components/links/search-link";
import ViewMode from "@/components/links/view-mode";

export default function DashboardLayout(props: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col items-center h-[calc(100vh-4.4rem)] gap-6 pt-6 font-[family-name:var(--font-geist-sans)]">
            <div className="flex container gap-2">
                <SearchLink />
                <SortLinks />
                <ViewMode />
                <CreateLink />
            </div>
            <div>{props.children}</div>
        </main>
    )
}