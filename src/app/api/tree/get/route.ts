import { TreeItemData } from '@/app/types/imageData';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export function GET() {
  const filePath = path.join(process.cwd(),'src','app' ,'data', 'treeData.json');

  let jsonData: TreeItemData[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return NextResponse.json(jsonData);
}