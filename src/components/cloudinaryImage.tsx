import { ImageData, ImageMetadata } from "@/app/types/imageData";
import { CldImage, CldOgImage } from "next-cloudinary";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Aperture, ArrowLeftRight, CameraIcon, Flashlight, FlashlightOff, Frame, LucideCamera, Sun, SwitchCamera, Timer, ZoomIn } from "lucide-react";
import { Button } from "./ui/button";
import { saveAs } from 'file-saver';
import axios from 'axios';
import { Skeleton } from "./ui/skeleton";

const CloudinaryImage = (resource: ImageData) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    async function DownloadImage(url: string) {
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        saveAs(blob, 'photo.jpeg');
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CldImage
                    key={resource.public_id}
                    src={resource.public_id}
                    width={700}
                    height={700}
                    className="rounded-lg"
                    alt={resource.public_id}
                    onClick={() => setIsDialogOpen(true)}
                />
            </DialogTrigger>
            <DialogContent className="max-w-full border-0 p-4 flex flex-col md:flex-row bg-transparent items-center md:justify-center overflow-y-auto h-full w-full">
                <CldImage
                    key={resource.public_id}
                    src={resource.public_id}
                    height={700}
                    width={700}
                    alt={resource.public_id}
                    quality={80}
                    onClick={() => setIsDialogOpen(true)}
                    onLoad={() => setIsImageLoaded(true)}
                    className={`rounded-lg w-auto max-h-[90vh] ${isImageLoaded ? '' : 'opacity-0 absolute'}`}
                />
                {!isImageLoaded && <Skeleton className="h-[90vh] w-[405px]" />}
                {resource.image_metadata &&
                    <div className="flex flex-col gap-4 justify-center items-start justify-center py-6 px-4 w-auto">
                        <DialogTitle className="font-bold text-xl">Metadata</DialogTitle>
                        <div className="flex gap-2"><Sun className="flex-shrink-0" /> ISO : {resource.image_metadata.ISO}</div>
                        <div className="flex gap-2"><ArrowLeftRight className="flex-shrink-0" />Focal Length : {resource.image_metadata.FocalLength}</div>
                        <div className="flex gap-2"><Aperture className="flex-shrink-0" />Aperture : f/{resource.image_metadata.FNumber}</div>
                        <div className="flex gap-2"><Timer className="flex-shrink-0" /> Exposure : {resource.image_metadata.ExposureTime}</div>
                        <div className="flex gap-2"><CameraIcon className="flex-shrink-0" /> Camera : {resource.image_metadata.Model}</div>
                        <div className="flex gap-2"><SwitchCamera className="flex-shrink-0" /> <span>Lens : {resource.image_metadata.Lens}</span></div>
                        {resource.image_metadata.Flash == "No Flash" ? <div className="flex gap-2"><FlashlightOff /><span>No Flash</span></div> : <div><Flashlight /><span>Flash</span></div>}
                        <Button className='w-full' variant="secondary" onClick={() => DownloadImage(resource.url)}>Download</Button>
                    </div>
                }
            </DialogContent>
        </Dialog>


    );
};

export default CloudinaryImage;