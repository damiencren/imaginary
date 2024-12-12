import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios'; 
import { URL } from 'url';

export async function GET(request: NextRequest) {
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const request_url = new URL(request.url);
    const collection_name = request_url.searchParams.get('collection_name');

    const url = `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/folders/${collection_name}`;
    console.log('URL:', url);
    try {
        const response = await axios.get(url);

        return NextResponse.json(response.data);

    } catch (error: any) {
        console.error('Error retrieving albums:', error);

        return NextResponse.json({ success: false, error: error.message });
    }
}
