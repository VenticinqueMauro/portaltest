'use client';

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner";
import { handleCreateNews } from "@/actions/news/handleCreateNews"


export default function CreateNewsForm() {


    const handleSubmit = async (formData: FormData) => {

        const response = await handleCreateNews(formData)

        if (response.error) {
            toast.error(response.error);
        } else if (response.message) {
            toast.success(response.message);
        } else {
            toast.warning(response);
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
            <Button type="submit" className="w-full">Crear</Button>
        </form>
    )
}
