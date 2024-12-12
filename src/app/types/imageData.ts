export type TreeItemData = {
    name: string
    icon?: string
    href?: string
    children?: TreeItemData[]
};

export type CollectionData = {
    folders: string[]
}

export type ImageMetadata = {
    Artist: string
    DateTimeOriginal: string
    ExposureTime: string
    FNumber: string
    ISO: string
    Lens: string
    Model: string
    Flash: string
    FocalLength: string
}

export type ImageData = {
    public_id: string
    image_metadata: ImageMetadata;
    url : string
    height: number
    width: number
}