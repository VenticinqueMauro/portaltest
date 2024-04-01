'use client';

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface Props {
    title: String;
}
export default function SubmitButton({ title }: Props) {

    const { pending } = useFormStatus();

    return (
        <Button type="submit" className={`${pending ? "opacity-80 cursor-not-allowed" : ''} w-full flex items-center gap-1`}>
            {pending ? "cargando..." : title}
        </Button>

    )
}
