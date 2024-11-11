import ImageGrid from '@/components/imageGrid';
import ImportButton from '@/components/importButton';
import { v2 as cloudinary } from 'cloudinary'; 
import { ImageData } from '@/app/types/imageData';
import { useEffect } from 'react';

const AlbumPage = async () => {

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
            <ImageGrid images={images.resources} />
        </div>
    );
};

export default AlbumPage;