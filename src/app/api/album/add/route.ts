import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const { albumName, collectionName } = await request.json();

  const url = `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/folders/${collectionName}/${albumName}`;

  try {
    const response = await axios.post(url);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error adding album:', error);
    return NextResponse.json({error: 'Error adding the album'});
  }
}