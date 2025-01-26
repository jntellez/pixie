import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VscSave } from "react-icons/vsc";

export default function OptionCard(props: { item: { title: string, description: string, value: string } }) {
    const { title, description, value } = props.item

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription className="text-md">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Input type="text" placeholder="Your name" value={value} />
            </CardContent>
            <CardFooter className="flex justify-between align-center py-2 px-6 border-t-[1px] border-slate-200 dark:border-slate-800">
                <div></div>
                <Button variant="outline">
                    <VscSave />
                    Save
                </Button>
            </CardFooter>
        </Card>
    );
}