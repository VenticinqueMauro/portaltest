import { handleEditPortadaHome } from "@/actions/editar-home/handleEditPortadaHome";
import { Button } from "@/components/ui/button";
import { MainCover } from "@/types/news.types";
import { toast } from "sonner";

interface Props {
    selectedNews: MainCover;
}

export default function SubmitButtonEditHome({ selectedNews }: Props) {


    const isDataValid = selectedNews?.cover.leftSidebar?.length === 4 &&
        selectedNews?.cover.rightSidebar?.length === 2 &&
        selectedNews?.cover.mainNews?.media?.url &&
        selectedNews?.cover.mainNews?.pretitle &&
        selectedNews?.cover.mainNews?.title &&
        selectedNews?.cover.mainNews?.summary;

    const handleClick = async () => {
        if (isDataValid) {
            const response = await handleEditPortadaHome(selectedNews);
            if (response.error) {
                toast.error(response.error)
            } else if (response.message) {
                toast.success(response.message);
            } else {
                toast.warning(response)
            }
        } else {
            toast.warning("Por favor, completa todos los campos necesarios antes de guardar.");
        }
    }

    return (
        <div className="col-span-12 col-start-1">
            <Button size='sm' className="float-end block w-fit" onClick={handleClick} disabled={!isDataValid}>Guardar cambios</Button>
        </div>
    )
}
