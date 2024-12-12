import { TreeItemData } from '@/app/types/imageData';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import axios from 'axios';

interface Child {
  name: string;
  href: string;
  icon: string;
}

interface Folder extends Child {
  children: Child[];
}

export async function GET() {

  async function getFolders(path: string): Promise<any> {
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/folders${path}`;
    const credentials = btoa(`${apiKey}:${apiSecret}`);

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      },
    });
    const data = response.data;
    return data.folders;
  }

  const rootFolders = await getFolders('');
  const result: Folder[] = [];

  for (const folder of rootFolders) {
    const children: Child[] = [];
    const subFolders = await getFolders(`/${folder.name}`);

    for (const subFolder of subFolders) {
      console.log('Subfolder:', subFolder);
      children.push({
        name: subFolder.name,
        href: `/${folder.name}/${subFolder.name}`,
        icon: 'file',
      });
    }

    result.push({
      name: folder.name,
      href: `/${folder.path}`,
      icon: 'folder',
      children: children,
    });
  }

  console.log('Folders:', result);
  return NextResponse.json(result);
}