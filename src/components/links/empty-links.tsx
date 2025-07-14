import { GiDwarfFace } from "react-icons/gi";
import CreateLink from "./create-link";

export function EmptyLinks() {
    return (
        <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
            <GiDwarfFace size={48} className="text-muted-foreground" />
            <h2 className="text-xl font-semibold">No links yet</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
                You haven&apos;t created any short links. Start by creating your first one!
            </p>
            <CreateLink />
        </div>
    )
}
