import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteAccountDialog from "@/components/settings/delete-acount-dialog";

export default function DeleteAccountCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Delete account</CardTitle>
                <CardDescription className="text-md">By deleting your account you will lose all saved links</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <DeleteAccountDialog />
            </CardContent>
            <CardFooter className="flex justify-between align-center py-2 px-6 border-t-[1px] border-slate-200 dark:border-slate-800">
                <div className="p-4"></div>
            </CardFooter>
        </Card>
    );
}