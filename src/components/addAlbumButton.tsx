import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { SidebarMenuAction } from "./ui/sidebar";
import { addAlbum } from "@/lib/album";

const AddAlbumButton = ({ collection_name }: { collection_name: string }) => {
    const [error, setError] = useState("");
    const [albumName, setAlbumName] = useState("");
    const [isAlbumDialogOpen, setIsAlbumDialogOpen] = useState(false);

    const handleSubmitAlbum = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (albumName) {
            const result = await addAlbum(collection_name, albumName);
            if (!result.success) {
                setError('Failed to add the album. Try another name');
            }
        }
    };

return (
    <Dialog open={isAlbumDialogOpen} onOpenChange={setIsAlbumDialogOpen}>
        <DialogTrigger asChild>
            <Button variant={"outline"}>
                <Plus />
                <span>Add an album</span>
            </Button>
        </DialogTrigger>
        <DialogContent onClick={(event) => { event.stopPropagation(); }}>
            <DialogHeader>
                <DialogTitle>{`New Album into ${collection_name}`}</DialogTitle>
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

export default AddAlbumButton;