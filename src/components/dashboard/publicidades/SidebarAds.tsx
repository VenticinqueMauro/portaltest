import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AdPosition } from "@/types/news.types";
import { ScreenShare, TabletSmartphone, Trash } from "lucide-react";
import { createRef, useEffect, useState } from "react";
import SubmitButton from "../form-news/SubmitButton";
import Image from "next/image";
import { handleAds } from "@/actions/publicidades/handleAds";
import { toast } from "sonner";

interface Props {
    sectionName: string;
    sectionPosition: AdPosition | undefined;
    deskPublicId: any
    mobPublicId: any;
}

export default function SidebarAds({ sectionName, sectionPosition, deskPublicId, mobPublicId }: Props) {

    const [imagePreviewDesktop, setImagePreviewDesktop] = useState<string | undefined>(undefined);
    const [desktopFile, setDesktopFile] = useState<File | null>(null);
    const [imagePreviewMobile, setImagePreviewMobile] = useState<string | undefined>(undefined);
    const [mobileFile, setMobileFile] = useState<File | null>(null);


    // FUNCIONES PARA PREVIEW DE IMAGENES 

    const handleImageUploadDesktop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewDesktop(reader.result as string);
                setDesktopFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUploadMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewMobile(reader.result as string);
                setMobileFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImageDesktop = () => {
        setImagePreviewDesktop(undefined);
        setDesktopFile(null);
    };

    const handleDeleteImageMobile = () => {
        setImagePreviewMobile(undefined);
        setMobileFile(null);
    };

    ////////////////////////////////////////////

    const handleForm = async (formData: FormData) => {

        if (deskPublicId) {
            formData.append('deskPublicId', deskPublicId as string);
        }
        if (mobPublicId) {
            formData.append('mobPublicId', mobPublicId as string);

        }
        if (desktopFile) {
            formData.append('desktop', desktopFile as File);

        }
        if (mobileFile) {
            formData.append('mobile', mobileFile as File);
        }
        formData.append('section', sectionName);
        formData.append('position', sectionPosition as string);
        const response = await handleAds(formData);
        if (response.error) {
            toast.error(response.error)
        } else if (response.message) {
            toast.success(response.message)
        } else {
            toast.warning(response)
        }
    }

    const ref = createRef<HTMLFormElement>();

    useEffect(() => {
        if (ref.current) {
            ref.current.reset();
        }
    }, [sectionPosition, ref]);

    useEffect(() => {
        setImagePreviewDesktop(undefined)
        setImagePreviewMobile(undefined)
        setDesktopFile(null)
        setMobileFile(null)
    }, [sectionPosition])

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
                            Desktop {sectionPosition === 'top' ? '970x150 (sugerido)' : '200x500 (sugerido)'}
                        </Label>
                        <Input id="desktop" type='file' accept="image/*" className="mb-3 w-fit" onChange={handleImageUploadDesktop} />
                        {desktopFile && <span className="text-muted-foreground text-sm">Archivo seleccionado: {desktopFile.name}</span>}
                        {
                            imagePreviewDesktop && (
                                <div className="relative">
                                    <Image
                                        src={imagePreviewDesktop}
                                        alt="preview"
                                        width={sectionPosition === 'top' ? 970 : 200}
                                        height={sectionPosition === 'top' ? 150 : 500}
                                        className={`${sectionPosition === 'top' ? 'aspect-[970/150]' : 'aspect-[200/500]'} mb-3`}
                                    />
                                    <button onClick={handleDeleteImageDesktop} className="absolute top-0 right-0  mr-1">
                                        <Trash className="w-4 h-4 text-destructive" />
                                    </button>
                                </div>
                            )
                        }
                        <Separator className='mb-3' />
                        <Label htmlFor="mobile" className="flex gap-1 items-center mb-2 text-muted-foreground font-normal">
                            <TabletSmartphone />
                            Mobile
                        </Label>
                        <Input id="mobile" type='file' accept="image/*" className="mb-3 w-fit" onChange={handleImageUploadMobile} />
                        {mobileFile && <span className="text-muted-foreground text-sm">Archivo seleccionado: {mobileFile.name}</span>}
                        {
                            imagePreviewMobile &&
                            <div className="relative">
                                <Image src={imagePreviewMobile} alt="preview" width={200} height={500} className=" mb-3" />
                                <button onClick={handleDeleteImageMobile} className="absolute top-0 right-0 mr-1">
                                    <Trash className="w-4 h-4 text-destructive" />
                                </button>
                            </div>
                        }
                        <SubmitButton title={'Guardar cambios'} disabled={!imagePreviewDesktop && !imagePreviewMobile} />
                    </form> :
                    <p className="text-center text-muted-foreground">Seleccione un espacio publicitario</p>
            }
        </div>
    )
}
