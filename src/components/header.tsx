"use client"
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";

const Header = () => {
    const pathname = usePathname();
    const [collection_name, album_name] = pathname.split('/').filter(Boolean);
    console.log(collection_name, album_name);
    return (
        <div className="flex-none px-6 py-4 flex gap-5 items-center border-b">
            <SidebarTrigger className="size-lg" />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        {/* <Link > */}
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        {/* </Link> */}
                    </BreadcrumbItem>
                    {collection_name && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>{collection_name}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    )}
                    {album_name && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{album_name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>

                    )}

                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default Header;