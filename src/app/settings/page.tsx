import OptionCard from "@/components/settings/option-card";
import DeleteAccountCard from "@/components/settings/delete-account-card";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation"

export const metadata = {
    title: 'Settings',
};

export default async function SettingsPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth");
    }

    const settings = [
        {
            title: "Your name",
            description: "This is your name that you will share with your username",
            value: session.user.name || "",
            field: "name" as const,
        },
        {
            title: "Your email",
            description: "This is the email associated with your account",
            value: session.user.email || "",
            field: "email" as const,
        },
    ];

    return (
        <div className={cn("grid container grid-cols-1 gap-4")}>
            {settings.map((setting) => (
                <OptionCard key={setting.field} item={setting} />
            ))}
            <DeleteAccountCard />
        </div>
    );
}