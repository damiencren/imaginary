import EquipmentCard from "@/components/equipmentCard";
import { Camera } from "lucide-react";
import Image from "next/image";

const EquipmentPage = () => {


    return (
        <div className="flex flex-col flex-1 gap-4">
            <h1 className="text-4xl font-bold">Equipment</h1>
            <div className="flex gap-4 flex-col sm:flex-row">
                <EquipmentCard name="Canon EOS R50" description="Un appareil photo abordable pour débuter." image="/r50.png" href="https://www.dpreview.com/products/canon/slrs/canon_eosr50/specifications"/>
                <EquipmentCard name="RF-S 18-45mm f/4.5-6.3 IS STM" description="Un objectif très polyvalent, idéal pour les sorties sans type de photographie spécifique à réaliser." image="/rfs-18-45.png" href="https://www.dpreview.com/products/canon/lenses/canon_rfs_18-45_4p5-6p3_is_stm"/>
                <EquipmentCard name="RF 50mm f/1.8 STM" description="Objectif avec un zoom plus important, principalement en raison du facteur de recadrage du capteur APS-C du R50, que j'utilise pour les portraits" image="/rf50.png" href="https://www.dpreview.com/products/canon/lenses/canon_rf_50_1p8_stm"/>
            </div>
        </div>
    );
};

export default EquipmentPage;