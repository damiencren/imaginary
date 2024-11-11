import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { TreeItemData } from "@/app/types/imageData";
import { SidebarMenuAction } from "./ui/sidebar";

const AddAlbumDialog = ({ clickedCollection }: { clickedCollection: string }) => {
    const [error, setError] = useState("");
    const [albumName, setAlbumName] = useState("");
    const [isAlbumDialogOpen, setIsAlbumDialogOpen] = useState(false);


    const addAlbum = async (newAlbum: TreeItemData, clickedCollection: string) => {
        try {
            const response = await fetch('/api/album/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newAlbum, clickedCollection }),
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

    const handleSubmitAlbum = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (albumName) {
            addAlbum({ name: albumName }, clickedCollection)
                .then((error) => {
                    if (error) {
                        setError(error);
                    } else {
                        setError('');
                        setIsAlbumDialogOpen(false);
                    }
                });
        }
    };

    return (
        <Dialog open={isAlbumDialogOpen} onOpenChange={setIsAlbumDialogOpen}>
            <DialogTrigger asChild>
                <SidebarMenuAction>
                    <Plus />
                </SidebarMenuAction>
            </DialogTrigger>
            <DialogContent onClick={(event) => { event.stopPropagation(); }}>
                <DialogHeader>
                    <DialogTitle>{`New Album into ${clickedCollection}`}</DialogTitle>
                    <DialogDescription>{"Choose a name that hasn't been used yet."}</DialogDescription>
                </DialogHeader>
                <Label>Name</Label>
                <Input id="name" name="name" type="text" placeholder="Type the name here..." value={albumName} onChange={(e) => setAlbumName(e.target.value)} required />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <form onSubmit={handleSubmitAlbum}>
                    <DialogFooter>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddAlbumDialog;