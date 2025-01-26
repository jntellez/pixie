import OptionCard from "@/components/settings/option-card";
import DeleteAccountCard from "@/components/settings/delete-account-card";
import { cn } from "@/lib/utils";

const settings = [
    {
        title: "Your name",
        description: "This is your name that you will share with your username",
        value: "Juan Tellez"
    },
    {
        title: "Your email",
        description: "This is the e﻿mail associated with your account",
        value: "juantellez916@gmail.com",
    },
]

export default function SettingsPage() {
    return (
        <div className={cn("grid container grid-cols-1 gap-4")}>
            {settings.map((setting,) => <OptionCard key={setting.title} item={setting} />)}
            <DeleteAccountCard />
        </div>
    );
}