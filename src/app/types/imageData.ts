export type TreeItemData = {
    name:string
    icon?:string
    href?:string
    children?:TreeItemData[]
};

export type ImageData = {
    public_id:string
}