'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react"
import SubmitAdminButton from "../form-admin-users/SubmitAdminButton";
import { handleQuotation } from "@/actions/quotations/handleQuotation";
import { toast } from "sonner";

interface Props {
    data: {
        globalTitle: string | undefined;
        title: string;
        titleQuote1: string;
        titleQuote2: string;
    }
}

export function DialogEditQuotation({ data }: Props) {

    console.log(data)

    const handleSubmit = async (formData: FormData) => {

        formData.append('title', data.title);
        formData.append('titleQuote1', data.titleQuote1);
        formData.append('titleQuote2', data.titleQuote2);

        const response = await handleQuotation(formData);

        if (response.error) {
            toast.error(response.error)
        } else if (response.message) {
            toast.success(response.message)
            const escapeKeyEvent = new KeyboardEvent('keydown', {
                key: 'Escape',
                code: 'Escape',
                keyCode: 27,
                which: 27,
                bubbles: true,
                cancelable: true,
            });
            document.dispatchEvent(escapeKeyEvent);
        } else {
            toast.warning(response)
        }


    }

    return (
        <Dialog>
            <DialogTrigger className="absolute top-1 right-2 cursor-pointer text-muted-foreground hover:text-foreground">
                <Edit className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar {data.globalTitle}</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="priceQuote1" className="uppercase">{data.titleQuote1}</Label>
                        <Input
                            id="priceQuote1"
                            name="priceQuote1"
                            type="text"
                            placeholder="Ingrese el nuevo precio"
                            pattern="\d*\.?\d*"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="priceQuote2" className="uppercase">{data.titleQuote2}</Label>
                        <Input
                            id="priceQuote2"
                            name="priceQuote2"
                            type="text"
                            placeholder="Ingrese el nuevo precio"
                            pattern="\d*\.?\d*"
                        />
                    </div>
                    <SubmitAdminButton title={'Actualizar'} />
                </form>
            </DialogContent>
        </Dialog>
    )
}
