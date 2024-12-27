"use client"
import ImageGrid from '@/components/imageGrid';
import ImportButton from '@/components/importButton';
import { ImageData } from '@/app/types/imageData';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { usePathname } from 'next/navigation';
import axios from 'axios';
import SkeletonImageGrid from '@/components/skeletonImageGrid';

const AlbumPage = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    const pathname = usePathname();
    const [collection_name, album_name] = pathname.split('/').filter(Boolean).map(decodeURIComponent);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = () => {
        axios.post('/api/album/get', {
            collection_name: collection_name,
            album_name: album_name
        })
            .then(response => {
                setImages(response.data)
                setLoading(false);
            })
            .catch(error => console.error('Error fetching tree data:', error));
    };

    return (
        <div className="flex flex-col flex-1 gap-4">
            <div className="flex w-full justify-between items-start">
                <h1 className="text-4xl font-bold">{album_name}</h1>
                {status === 'authenticated' && (
                    <ImportButton uploadPath={`${collection_name}/${album_name}`} />
                )}
            </div>
            {loading ? <SkeletonImageGrid /> : <ImageGrid images={images} />}
        </div>
    );
};

export default AlbumPage;