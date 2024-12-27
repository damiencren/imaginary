'use client'
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";


const AddCollectionButton = ({ className}: { className?: string }) => {
    const [error, setError] = useState("");
    const [collectionNameState, setCollectionNameState] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data: session } = useSession();

    const addCollection = async (collectionName: string) => {
        try {
            const response = await fetch('/api/collection/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ collectionName:collectionName }),
            });
            if (!response.ok) {
                throw new Error();
            }
            const result = await response.json();
            return null;
        } catch (error) {
            return 'Failed to add the collection. Try another name';
        }
    };

    const handleSubmitCollection = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (collectionNameState) {
            addCollection(collectionNameState)
                .then((error) => {
                    if (error) {
                        setError(error);
                    } else {
                        setError('');
                        setIsDialogOpen(false);
                    }
                });
        }
    };

    if (!session) {
        return null;
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className={className}>
                    <Plus/>
                    <span>Add a collection</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{"New Collection"}</DialogTitle>
                    <DialogDescription>{"Choose a name that hasn't been used yet."}</DialogDescription>
                </DialogHeader>
                <Label>Name</Label>
                <Input id="name" name="name" type="text" placeholder="Type the name here..." value={collectionNameState} onChange={(e) => setCollectionNameState(e.target.value)} required />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <form onSubmit={handleSubmitCollection}>
                    <DialogFooter>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default AddCollectionButton;