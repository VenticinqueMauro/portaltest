import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AdPosition } from "@/types/news.types";
import { ScreenShare, TabletSmartphone } from "lucide-react";
import { createRef, useEffect } from "react";

interface Props {
    sectionName: string;
    sectionPosition: AdPosition | undefined;
    handleForm: (formData: FormData) => Promise<void>
}

export default function SidebarAds({ sectionName, sectionPosition, handleForm }: Props) {

    const ref = createRef<HTMLFormElement>();

    useEffect(() => {
        if (ref.current) {
            ref.current.reset();
        }
    }, [sectionName, sectionPosition, ref]);

    return (
        <div className='rounded border col-span-3 px-3 flex gap-y-3 flex-col sticky top-0 right-0 h-screen overflow-y-auto'>
            <div className='space-y-2  sticky top-0 z-10 bg-white w-full backdrop-blur pt-3 '>
                <p className="text-xl tracking-tight font-semibold capitalize">{sectionName === 'eco & negocios' ? 'Economía' : sectionName === 'portalcana' ? 'Portal de la caña' : sectionName}</p>
                <Separator />
            </div>
            {
                sectionPosition ?
                <form ref={ref} action={handleForm}>
                    <p className="text-lg tracking-tight mb-5 font-medium">{sectionPosition === 'top' ? 'Banner principal' : sectionPosition === 'side' ? 'Banner lateral' : 'Banner inferior'}</p>
                    <Label htmlFor="desktop" className="flex gap-1 items-center mb-2 text-muted-foreground font-normal">
                        <ScreenShare />
                        Desktop
                    </Label>
                    <Input id="desktop" name="desktop" type='file' accept="image/*" className="mb-5 w-fit" />
                    <Label htmlFor="mobile" className="flex gap-1 items-center mb-2 text-muted-foreground font-normal">
                        <TabletSmartphone />
                        Mobile
                    </Label>
                    <Input id="mobile" name="mobile" type='file' accept="image/*" className="mb-3 w-fit" />
                    <Button color="primary" type="submit" className="w-full">Guardar Cambios</Button>
                </form> :
                <p className="text-center text-muted-foreground">Seleccione un espacio publicitario</p>
            }
        </div>
    )
}
