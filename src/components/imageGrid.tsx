"use client";
import { ImageData } from "@/app/types/imageData";
import { ReactNode } from "react";
import CloudinaryImage from "./cloudinaryImage";

const MAX_COLUMNS = 4;

const ImageGrid = ({images}: {images: ImageData[]}) => {
    
    function getColumns(colIndex: number) {
        return images.filter((resource, idx) => idx % MAX_COLUMNS === colIndex);
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
                (column, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                        {column.map((resource) => (
                            <CloudinaryImage 
                            key={resource.public_id} 
                            src={resource.public_id}
                            width={700}
                            height={700}
                            className="rounded-lg"
                            alt={resource.public_id}
                            />
                        ),)}
                    </div>
                )
            )}
        </div>
    );
}

export default ImageGrid