import { MdSearch } from "react-icons/md";
import { Input } from "../ui/input";

export default function SearchLink() {
    return (
        <div className="w-full">
            <MdSearch className="absolute mt-[10px] ml-[10px] text-slate-400" />
            <Input placeholder="Search for a link" className="pl-8" />
        </div>
    )
}