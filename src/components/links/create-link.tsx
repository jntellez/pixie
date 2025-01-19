import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { Textarea } from "../ui/textarea";
import { GiDwarfFace } from "react-icons/gi";

export default function CreateLink() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="">
                    <GiDwarfFace />
                    <span>Create Link</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Link</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 space-y-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="url">Long Url</Label>
                        <Input
                            id="url"
                            placeholder="https://"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="shorUrl">Short Url</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="shorUrl"
                                placeholder="Short link"
                            />
                            <Button variant="outline" className="px-3">
                                <GiPerspectiveDiceSixFacesRandom />
                                <span>Generate</span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea placeholder="Type short link description here (optional)" id="description" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>
                        <GiDwarfFace />
                        <span>Create Link</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
