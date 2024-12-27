import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function POST(req: NextRequest) {

  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const { albumName, collectionName } = await req.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/folders/${collectionName}/${albumName}`;

  try {
    const axiosResponse = await axios.post(url);
    return NextResponse.json(axiosResponse.data);
  } catch (error) {
    console.error('Error adding album:', error);
    return NextResponse.json({ error: 'Error adding the album' });
  }
}