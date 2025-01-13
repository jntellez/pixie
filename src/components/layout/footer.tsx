import { GoArrowUpRight } from "react-icons/go";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t-[1px] border-zinc-200 dark:border-slate-800 text-white absolute bottom-0 w-full py-5">
            <div className="flex container justify-between">
                <a href="https://github.com/jntellez/pixie" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-zinc-500 dark:text-slate-500 hover:underline">
                    <p>Made by Juan Téllez 2025</p>
                    <GoArrowUpRight />
                </a>
                <a href="https://github.com/pheralb/slug" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-zinc-500 dark:text-slate-500 hover:underline">
                    <p>Inspired by pheralb/slug</p>
                    <GoArrowUpRight />
                </a>
            </div>
        </footer>
    );
}
