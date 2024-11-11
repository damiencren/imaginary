// 'use client';
// import { Image, Plus, Search } from "lucide-react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import ImportButton from "./importButton";
// import { useActionState, useEffect, useState } from "react";
// import AddCollectionDialog from "./addCollectionDialog";
// import AddAlbumDialog from "./addAlbumDialog";

// const SideBar = () => {
//     const [data, setData] = useState<TreeDataItem | TreeDataItem[]>([]);

//     const fetchData = () => {
//         fetch('/api/tree/get', { method: 'GET' })
//             .then(res => res.json())
//             .then((res: TreeDataItem[]) => res.map(item => ({
//                 ...item,
//                 actions: [
//                     <AddAlbumDialog key={`${item.id}-addBtn`} onAdd={fetchData} clickedCollection={item.id} />
//                 ]
//             })))
//             .then((res: TreeDataItem[]) => res.map((item: TreeDataItem) => ({
//                 ...item,
//                 children: item.children ? item.children.map((child: TreeDataItem) => ({
//                     ...child,
//                     onclick: () => console.log(`Clicked on child with id: ${child.id}`)
//                 })) : []
//             })))
//             .then(data => setData(data))
//             .catch(error => console.error('Error fetching tree data:', error));
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);



//     return (
//         <div className="w-1/4 border-r h-full flex flex-col p-4 gap-3">
//             <div>
//                 <h2 className="ml-2 text-lg font-semibold gap-2">Gallery</h2>
//                 <Input placeholder="Search" />
//             </div>
//             <div className="flex flex-col overflow-auto gap-2">
//                 <Button variant="secondary" className="w-full justify-start">
//                     <Image size={16} className="mr-2" />
//                     Albums
//                 </Button>
//                 <AddCollectionDialog onAdd={fetchData} />
//             </div>
//             <Button>Deploy</Button>
//             <TreeView
//                 data={data}
//             />
//         </div>
//     )
// }

// export default SideBar;