import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";


interface EquipmentCardProps {
    name: string;
    description: string;
    image: string;
    href: string;
}

const EquipmentCard = ({ name, description, image, href }: EquipmentCardProps) => {
    return (
        <div className="flex flex-col gap-2 rounded-xl p-3 bg-card w-full sm:w-[300px] h-[460px] shadow-xl">
            <Image src={image} alt={name} width={800} height={800} className="w-full h-48 object-contain rounded-lg bg-card-foreground" />
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-md">{description}</p>
            <Link href={href} className="mt-auto w-full">
                <Button className="w-full" variant="secondary">More infos</Button>
            </Link>
        </div>
    )
}

export default EquipmentCard;