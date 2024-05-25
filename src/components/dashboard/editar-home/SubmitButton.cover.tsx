import { handleEditPortadaHome } from "@/actions/editar-home/handleEditPortadaHome";
import { Button } from "@/components/ui/button";
import { MainCover } from "@/types/news.types";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    selectedNews: MainCover;
}

export default function SubmitButtonEditHome({ selectedNews }: Props) {

    const [loading, setLoading] = useState(false);

    const isDataValid = selectedNews?.cover.leftSidebar?.length === 4 &&
        selectedNews?.cover.rightSidebar?.length === 2 &&
        selectedNews?.cover.mainNews?.media?.url &&
        selectedNews?.cover.mainNews?.pretitle &&
        selectedNews?.cover.mainNews?.title &&
        selectedNews?.cover.mainNews?.summary &&
        selectedNews?.cover.mainNews?.category &&
        selectedNews?.cover.mainNews?.path;

    const handleClick = async () => {
        setLoading(true);
        if (isDataValid) {
            const response = await handleEditPortadaHome(selectedNews);
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
