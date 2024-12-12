"use client";
import { ImageData } from "@/app/types/imageData";
import { useEffect, useState } from "react";
import CloudinaryImage from "./cloudinaryImage";

const ImageGrid = ({ images }: { images: ImageData[] }) => {
    const [columns, setColumns] = useState<Array<ImageData[]>>([[], [], [], []]);

    function distributeImages() {
        const newColumns: Array<ImageData[]> = [[], [], [], []];
        const columnHeights = [0, 0, 0, 0];

        images.forEach((image) => {
            const imageHeight = image.height > image.width ? 2 : 1; // Portrait = 3, Landscape = 2 because ratio is 2:3
            const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
            newColumns[minHeightIndex].push(image);
            columnHeights[minHeightIndex] += imageHeight;
        });

        setColumns(newColumns);
    }

    useEffect(() => {
        distributeImages();
    }, [images]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {columns.map((column, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                    {column.map((resource) => (
                        <CloudinaryImage
                            {...resource}
                            key={resource.public_id}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ImageGrid;