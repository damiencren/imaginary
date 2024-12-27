"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import AddCollectionDialog from "./addCollectionButton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { BadgeInfo, BookUser, Calendar, Camera, ChevronDown, ChevronUp, Folder, Heading, Home, HomeIcon, Info, LogIn, LogOut, Paperclip, PersonStanding, PersonStandingIcon, Plus, Presentation, User, User2, UserCheck, UserCircle } from "lucide-react";
import { TreeItemData } from "@/app/types/imageData";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import Image from "next/image";
import AddAlbumMenuAction from "./addAlbumMenuAction";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";

const AppSideBar = () => {
    const [data, setData] = useState<TreeItemData[]>([]);

    const fetchData = () => {
        axios.get('/api/tree/get')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching tree data:', error));
    };

    const { data: session } = useSession();

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex gap-2 items-center p-2">
                        <Link href="/">
                            <Image src="/imaginary.png" alt="logo" width={200} height={200} />
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Pages</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <HomeIcon />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/equipment">
                                        <Camera />
                                        <span>Equipment</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/about">
                                        <BookUser />
                                        <span>About me</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Collections</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                {session && <AddCollectionDialog className="w-full h-8 justify-start rounded-lg" />}
                            </SidebarMenuItem>

                            {data.map((item: TreeItemData) => (
                                <Collapsible key={item.name} defaultOpen className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <Folder />
                                                <span>{item.name}</span>
                                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.children?.map((child: TreeItemData) => (
                                                    <SidebarMenuSubItem key={`${item.name}_${child.name}`}>
                                                        {child.href ? (
                                                            <SidebarMenuSubButton asChild>
                                                                <Link href={child.href}>
                                                                    <span>{child.name}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        ) : (
                                                            <span>{child.name}</span>
                                                        )}
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                        <AddAlbumMenuAction collectionName={item.name} />
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>

                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Account
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-60 border-2">
                                <DropdownMenuLabel>{session?.user?.name || "Guest"}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    {!session &&
                                        <DropdownMenuItem onClick={() => signIn("google")}>
                                            <LogIn />
                                            <span>Log in</span>
                                        </DropdownMenuItem>
                                    }
                                    {session &&
                                        <DropdownMenuItem onClick={() => signOut()}>
                                            <LogOut />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    }
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSideBar;