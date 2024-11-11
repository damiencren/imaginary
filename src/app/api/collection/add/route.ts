import { TreeItemData } from '@/app/types/imageData';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  const filePath = path.join(process.cwd(),'src','app' ,'data', 'treeData.json');

  const jsonData: TreeItemData[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const {name} = await request.json();

  const nameExists = jsonData.some(item => item.name === name);
  if (nameExists) {
    return NextResponse.json({ error: 'ID already exists' }, { status: 400 });
  }

  const newItem: TreeItemData = {
    name,
    href: `/${name}`,
    icon: 'folder',
    children: []
  };

  jsonData.push(newItem);
  
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

  return NextResponse.json(jsonData);
}