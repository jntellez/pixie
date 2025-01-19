import {
    Card,
    CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RxDashboard } from "react-icons/rx"
import { PiListBulletsBold } from "react-icons/pi";

export default function ViewMode() {
    return (
        <Card className="rounded-md">
            <CardContent className="flex p-1 space-x-1">
                <Button variant="ghost" className="w-[25px] h-[25px] flex items-center justify-center p-0 rounded-sm">
                    <RxDashboard className="text-black dark:text-white" />
                </Button>
                <Button variant="ghost" className="w-[25px] h-[25px] flex items-center justify-center p-0 rounded-sm">
                    <PiListBulletsBold className="text-black dark:text-white" />
                </Button>
            </CardContent>
        </Card>
    )
}
