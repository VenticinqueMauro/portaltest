'use client';

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner";
import { handleCreateNews } from "@/actions/news/handleCreateNews"
import { useState } from "react";


export default function CreateNewsForm() {

    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (formData: FormData) => {

        try {
            setIsLoading(true);
            const response = await handleCreateNews(formData)

            if (response.error) {
                toast.error(response.error);
            } else if (response.message) {
                toast.success(response.message);
            } else {
                toast.warning(response);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-8 py-10">
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
            <Input name='title' placeholder="Titulo" required />
            <Textarea name='summary' placeholder="Sumario" required />
            <Textarea name='content' placeholder="Contenido" required />
            <Input name='image' type="text" placeholder="Imagen" required />
            <Button type="submit" className={`${isLoading ? 'opacity-80 cursor-not-allowed' : ''} w-full`} disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Crear'}
            </Button>
        </form>
    )
}
