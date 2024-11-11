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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import AddCollectionDialog from "./addCollectionDialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Calendar, ChevronDown, Plus } from "lucide-react";
import { TreeItemData } from "@/app/types/imageData";
import { useEffect, useState } from "react";
import AddAlbumDialog from "./addAlbumDialog";
import Link from "next/link";

const AppSideBar = () => {
    const [data, setData] = useState<TreeItemData[]>([]);

    const fetchData = () => {
        fetch('/api/tree/get', { method: 'GET' })
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching tree data:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Picora</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <AddCollectionDialog />
                            </SidebarMenuItem>

                            {data.map((item: TreeItemData) => (
                                <Collapsible key={item.name} defaultOpen className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <Calendar />
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
                                        <AddAlbumDialog clickedCollection={item.name} />
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default AppSideBar;