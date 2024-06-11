'use client';

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface Props {
    title: String;
    style?: string | undefined
    disabled?: boolean
}
export default function SubmitComment({ title, style, disabled }: Props) {

    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={disabled} className={`${pending ? "opacity-80 cursor-not-allowed" : ''} px-2.5 py-1.5 rounded text-white text-sm bg-primary ${style ? style : ''}`}>
            {pending && title.startsWith('Publicar') ? "publicando..." : title}
        </Button>
    )
}
