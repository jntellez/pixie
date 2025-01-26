import React from "react";

export default function DashboardLayout(props: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col items-center h-[calc(100vh-4.4rem)] gap-6 pt-6 font-[family-name:var(--font-geist-sans)]">
            {props.children}
        </main>
    )
}