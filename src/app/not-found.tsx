import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TbLinkOff } from "react-icons/tb"

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-3 mt-56 w-full md:w-3/4 lg:w-2/4">
            <TbLinkOff size={64} className="text-red-500" />
            <h1 className="text-2xl font-bold">Link not found</h1>
            <p className="text-muted-foreground max-w-md text-center">
                The short link you&apos;re trying to access doesn&apos;t exist or may have been deleted.
            </p>
            <Link href="/">
                <Button variant="default">Back to Home</Button>
            </Link>
        </div>
    )
}
