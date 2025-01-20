"use client"

import { MdSearch } from "react-icons/md";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchLink() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term)
        }
        else {
            params.delete('query')
        }

        replace(`${pathname}?${params.toString()}`)
    }, 350)

    return (
        <div className="w-full">
            <MdSearch className="absolute mt-[10px] ml-[10px] text-slate-400" />
            <Input placeholder="Search for a link" className="pl-8" defaultValue={searchParams.get('query')?.toString()} onChange={e => handleSearch(e.target.value)} />
        </div>
    )
}