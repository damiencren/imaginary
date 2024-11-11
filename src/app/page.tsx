import Image from "next/image";
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { v2 as cloudinary } from 'cloudinary'; 
import CloudinaryImage from "@/components/cloudinaryImage";
import { ImageData } from "./types/imageData";
import ImageGrid from "@/components/imageGrid";
import ImportButton from "@/components/importButton";

export default async function Home() {

  const images = (await cloudinary.search
    .expression('resource_type:image')
    .sort_by('public_id','desc')
    .max_results(30)
    .execute()) as {resources : ImageData[]};

  return (
    <div className="flex flex-col flex-1 overflow-auto p-4 gap-4">
      <div className="flex w-full justify-between items-start">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <ImportButton />
      </div>
      <ImageGrid images={images.resources}/>
    </div>
  );
}
