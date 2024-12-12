"use client";
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Album } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CollectionData } from '../../types/imageData';
import Link from 'next/link';
import AddAlbumDialog from '@/components/addAlbumMenuAction';
import AddAlbumButton from '@/components/addAlbumButton';
import { Skeleton } from '@/components/ui/skeleton';

export default function AlbumPage() {
    const [albums, setAlbums] = useState<CollectionData>({ folders: [] });

    const pathname = usePathname();
    const collection_name = pathname.split('/').filter(Boolean).map(decodeURIComponent)[0];

    const fetchAlbums = () => {
        axios.get(`/api/collection/get?collection_name=${collection_name}`)
            .then(response => setAlbums(response.data))
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    return (
        <div className="flex flex-col flex-1 gap-4">
            <div className="flex w-full justify-between items-start">
                <h1 className="text-4xl font-bold">{collection_name}</h1>
                <AddAlbumButton collection_name={collection_name} />
            </div>
            <h2 className="text-2xl font-bold">Albums</h2>
            {albums.folders.length === 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Array.from({ length: 5 }).map((_, resourceIdx) => (
                    <Skeleton key={resourceIdx} className="w-full h-[40px] rounded-lg" />
                ))} 
                </div>
                :
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {
                        albums.folders.map((folder: any) => (
                            <Link href={`/${collection_name}/${folder.name}`} key={folder.name}>
                                <Button className="w-full" key={folder.name} variant="secondary"><Album /> {folder.name}</Button>
                            </Link>
                        ))
                    }
                </div>
            }
        </div>
    );
};