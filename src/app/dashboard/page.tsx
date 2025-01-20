export default async function DashboardPage(props: {
    searchParams?: Promise<{
        query?: string;
        sort?: string;
        view?: string;
    }>;
}) {
    const searchParams = await props.searchParams
    // const query = searchParams?.query || ''

    return (
        <p>Links</p>
    )
}