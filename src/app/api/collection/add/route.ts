import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios'; // Added import for axios
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function POST(request: NextRequest) {

  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const { collectionName } = await request.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/folders/${collectionName}`;

  try {

    const response = await axios.post(url);

    console.log('Folder created:', response.data);

    return NextResponse.json(response.data);

  } catch (error: any) {

    console.error('Error creating folder:', error);

    return NextResponse.json({ success: false, error: error.message });

  }
}