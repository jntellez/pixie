import CreateLink from "@/components/links/create-link";
import SortLinks from "@/components/links/sort-links";
import SearchLink from "@/components/links/search-link";
import ViewMode from "@/components/links/view-mode";
import { Suspense } from "react";

export default function DashboardLayout(props: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex container gap-2">
                <Suspense fallback={<p>Loading...</p>}>
                    <SearchLink />
                </Suspense>
                <Suspense fallback={<p>Loading...</p>}>
                    <SortLinks />
                </Suspense>
                <Suspense fallback={<p>Loading...</p>}>
                    <ViewMode />
                </Suspense>
                <CreateLink />
            </div>
            {props.children}
        </>
    )
}