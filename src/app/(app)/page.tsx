import { v2 as cloudinary } from 'cloudinary';
import { Button } from "@/components/ui/button";
import { BookUser, Camera, Folder } from "lucide-react";
import Link from 'next/link';
import AddCollectionButton from '@/components/addCollectionButton';
import Image from 'next/image';

export default async function Home() {

  const folders = await cloudinary.api.sub_folders('');
  console.log(folders);

  return (
    <div className="flex flex-col flex-1 gap-4">
      <Image className='self-center' src={"/imaginary.png"} height={800} width={800} alt='Logo Imaginary' />
      <h2 className="text-2xl font-bold">Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href={"/equipment"}>
          <Button className="w-full" variant="default"><Camera />Equipment</Button>
        </Link>
        <Link href={"/about"}>
          <Button className="w-full" variant="default"><BookUser />About me</Button>
        </Link>
      </div>
      <div className="flex flex-row justify-between gap-4 items-center">
        <h2 className="text-2xl font-bold">Collections</h2>
        <AddCollectionButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3  gap-4">
        {folders.folders.map((folder: any) => (
          <Link href={`/${folder.name}`} key={folder.name}>
            <Button className="w-full" key={folder.name} variant="secondary"><Folder /> {folder.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
