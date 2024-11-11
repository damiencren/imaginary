import { TreeItemData } from '@/app/types/imageData';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  const filePath = path.join(process.cwd(),'src','app' ,'data', 'treeData.json');

  const jsonData: TreeItemData[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const { newAlbum, clickedCollection } = await request.json();

  const collection = jsonData.find(item => item.name === clickedCollection);
  if (!collection) {
    return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
  }

  const nameExists = collection.children?.some(child => child.name === newAlbum.name);
  if (nameExists) {
    return NextResponse.json({ error: 'Name already exists in the collection' }, { status: 400 });
  }

  const newItem: TreeItemData = {
    name: newAlbum.name,
    href: `/${clickedCollection}/${newAlbum.name}`,
    icon: 'file',
  };

  if (!collection.children) {
    collection.children = [];
  }
  collection.children.push(newItem);
  
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

  return NextResponse.json(jsonData);
}