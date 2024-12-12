import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: NextRequest) {
    const { collection_name, album_name } = await request.json();
    console.log('Collection:', collection_name, 'Album:', album_name);

    try {
        const images = await cloudinary.search
            .expression(`resource_type:image AND folder:"${collection_name}/${album_name}"`)
            .with_field('image_metadata')
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();

        return NextResponse.json(images.resources);

    } catch (error: any) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ success: false, error: error.message });
    }
}