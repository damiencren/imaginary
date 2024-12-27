"use client";
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
import { useSession } from "next-auth/react";

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Header = () => {
    const pathname = usePathname();
    const [collection_name, album_name] = pathname.split('/').filter(Boolean).map(decodeURIComponent);

    const { data: session } = useSession();

    console.log(session);

    return (
        <div className="flex-none px-6 py-4 flex gap-5 items-center border-b">
            <SidebarTrigger className="size-lg" />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {collection_name && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/${collection_name}`}>{capitalizeFirstLetter(collection_name)}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    )}
                    {album_name && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{capitalizeFirstLetter(album_name)}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>

                    )}
                </BreadcrumbList>
            </Breadcrumb>
            <Avatar className="ml-auto">
            {session && <AvatarImage src={session?.user?.image ?? undefined} />}
            <AvatarFallback></AvatarFallback>
            </Avatar>
        </div>
    )
}

export default Header;