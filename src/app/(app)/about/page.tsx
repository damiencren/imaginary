import { Button } from "@/components/ui/button";
import { Earth, EarthLock, Link, PlaneTakeoff, Webhook, WholeWord, WholeWordIcon } from "lucide-react";
import Image from "next/image";

const EquipmentPage = () => {


    return (
        <div className="flex flex-col flex-1 gap-4">
            <h1 className="text-4xl font-bold">About</h1>
            <a href="https://damiencren.me" target="_blank">
                <Button variant="default"><Link/> Portfolio</Button>
            </a>
        </div>
    );
};

export default EquipmentPage;