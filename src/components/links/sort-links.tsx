"use client";

import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoCalendarClearOutline } from "react-icons/io5";
import { RxCursorArrow } from "react-icons/rx";
import { TiArrowUnsorted } from "react-icons/ti";
import { IoLinkOutline } from "react-icons/io5";

export default function SortLinks() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentSort = searchParams.get("sort") || "date";

    const handleSortChange = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set("sort", term);
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    const getIcon = (value: string) => {
        switch (value) {
            case "date":
                return <IoCalendarClearOutline className="text-slate-400" />;
            case "clicks":
                return <RxCursorArrow className="text-slate-400" />;
            case "shortLink":
                return <IoLinkOutline className="text-slate-400" />;
            default:
                return <TiArrowUnsorted className="text-slate-400" />;
        }
    };

    return (
        <Select defaultValue={currentSort} onValueChange={handleSortChange}>
            <SelectTrigger className="flex max-w-[340px] items-center space-x-2">
                {getIcon(currentSort)}
                <SelectValue placeholder={`Sort by ${currentSort}`} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="clicks">Sort by Clicks</SelectItem>
                    <SelectItem value="shortLink">Sort by Short Link</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
