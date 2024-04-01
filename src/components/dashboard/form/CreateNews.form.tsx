'use client';

import { handleCreateNews } from "@/actions/news/handleCreateNews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createRef, useState } from "react";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";


export default function CreateNewsForm() {

    const ref = createRef<HTMLFormElement>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const MAX_FILE_SIZE_MB = 10; 

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) { 
                toast.error(`El archivo seleccionado es demasiado grande. Por favor, selecciona un archivo de máximo ${MAX_FILE_SIZE_MB}MB.`);
                event.target.value = ''; 
            } else {
                setSelectedFile(file);
            }
        }
    };

    const handleSubmit = async (formData: FormData) => {

        const response = await handleCreateNews(formData)

        if (response.error) {
            toast.error(response.error);
        } else if (response.message) {
            toast.success(response.message);
            ref.current?.reset()
        } else {
            toast.warning(response);
        }
    }

    return (
        <form ref={ref} action={handleSubmit} className="space-y-8 py-10">
            <Select name="category" required>
                <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="politica">politica</SelectItem>
                    <SelectItem value="deportes">deportes</SelectItem>
                    <SelectItem value="tendencias">tendencias</SelectItem>
                </SelectContent>
            </Select>
            <Input name='title' placeholder="Titulo" />
            <Textarea name='summary' placeholder="Sumario" required />
            <Textarea name='content' placeholder="Contenido" required />
            <Input name='image' type="file" placeholder="Imagen" accept="image/*,video/*" required onChange={handleFileChange}
            />
            <SubmitButton title={'Crear'} />
        </form>
    )
}
