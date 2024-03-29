'use client';

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { handleCreateNews } from "@/actions/news/handleCreateNews"

export default function CreateNewsForm() {

    return (
        <form action={handleCreateNews} className="space-y-8 py-10">
            <Select name="category">
                <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="politica">Light</SelectItem>
                    <SelectItem value="deportes">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
            <Input name='title' placeholder="Titulo" required />
            <Textarea name='summary' placeholder="Sumario" required />
            <Textarea name='content' placeholder="Contenido" required />
            <Input name='tags' placeholder="Etiquetas" />
            <Input name='image' type="text" placeholder="Imagen" />
            <Button type="submit" className="w-full">Crear</Button>
        </form>
    )
}
