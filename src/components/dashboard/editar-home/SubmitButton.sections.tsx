import { handleEditSectionsHome } from "@/actions/editar-home/handleEditSectionsHome";
import { Button } from "@/components/ui/button";
import { SectionNewsMap } from "@/types/news.types";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    selectedNews: SectionNewsMap;
    valueSection: string;
}

export default function SubmitButtonEditHome({ valueSection, selectedNews }: Props) {

    const [loading, setLoading] = useState(false);

    const isDataValid = selectedNews[valueSection as keyof SectionNewsMap]?.mainNews?.media?.url &&
        selectedNews[valueSection as keyof SectionNewsMap]?.mainNews?.pretitle &&
        selectedNews[valueSection as keyof SectionNewsMap]?.mainNews?.title &&
        selectedNews[valueSection as keyof SectionNewsMap]?.mainNews?.id &&
        selectedNews[valueSection as keyof SectionNewsMap]?.gridNews?.length === 4;


    const handleClick = async () => {
        setLoading(true);
        if (isDataValid) {
            const response = await handleEditSectionsHome(selectedNews);
            if (response.error) {
                toast.error(response.error);
                setLoading(false)
            } else if (response.message) {
                toast.success(response.message);
                setLoading(false)
            } else {
                toast.warning(response);
                setLoading(false)
            }
        } else {
            toast.warning("Por favor, completa todos los campos necesarios antes de guardar.");
            setLoading(false)
        }
    }

    return (
        <Button size='sm' className={`${loading && 'cursor-not-allowed opacity-50'} w-fit`} onClick={handleClick} disabled={!isDataValid}>
            {loading ? 'Guardando cambios...' : 'Guardar cambios'}
        </Button>
    )
}
