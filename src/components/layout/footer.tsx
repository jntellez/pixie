import { GoArrowUpRight } from "react-icons/go";
import ExternalLink from "../ui/external-link";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t-[1px] border-zinc-200 dark:border-slate-800 text-white absolute bottom-0 w-full py-5">
            <div className="flex container justify-between">
                <ExternalLink
                    href="https://github.com/jntellez/pixie"
                    className="flex items-center text-sm text-zinc-500 dark:text-slate-500 hover:underline"
                >
                    <p className="hidden sm:block">Made by Juan Téllez 2025</p>
                    <p className="block sm:hidden">Made by Juan</p>
                    <GoArrowUpRight />
                </ExternalLink>
                <ExternalLink
                    href="https://github.com/pheralb/slug"
                    className="flex items-center text-sm text-zinc-500 dark:text-slate-500 hover:underline"
                >
                    <p className="hidden sm:block">Inspired by pheralb/slug</p>
                    <p className="block sm:hidden">Inspired by slug</p>
                    <GoArrowUpRight />
                </ExternalLink>
            </div>
        </footer>
    );
}
