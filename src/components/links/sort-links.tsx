import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TiArrowUnsorted } from "react-icons/ti";

export default function SortLinks() {
    return (
        <Select defaultValue="date">
            <SelectTrigger className="flex max-w-[340px] items-center space-x-2">
                <TiArrowUnsorted className="text-slate-400" />
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="date">Sort by date</SelectItem>
                    <SelectItem value="clicks">Sort by clicks</SelectItem>
                    <SelectItem value="shortLink">Sort by short link</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
