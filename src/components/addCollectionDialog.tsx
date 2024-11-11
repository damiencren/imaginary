'use client'
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { TreeItemData } from "@/app/types/imageData";
import { SidebarMenuButton } from "./ui/sidebar";
import { Plus } from "lucide-react";

const AddCollectionDialog = () => {
    const [error, setError] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const addCollection = async (newData: TreeItemData) => {
        try {
            const response = await fetch('/api/collection/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
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

        if (collectionName) {
            addCollection({ name: collectionName })
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

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <SidebarMenuButton>
                    <Plus/>
                    <span>Ajouter une collection</span>
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{"New Collection"}</DialogTitle>
                    <DialogDescription>{"Choose a name that hasn't been used yet."}</DialogDescription>
                </DialogHeader>
                <Label>Name</Label>
                <Input id="name" name="name" type="text" placeholder="Type the name here..." value={collectionName} onChange={(e) => setCollectionName(e.target.value)} required />
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

export default AddCollectionDialog;