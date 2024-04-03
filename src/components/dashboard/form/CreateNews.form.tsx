'use client';

import { handleCreateNews } from "@/actions/news/handleCreateNews";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createRef, useState } from "react";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";
import Tiptap from "./Tiptap";
import { Label } from "@/components/ui/label";


export default function CreateNewsForm() {

    const ref = createRef<HTMLFormElement>();
    const [editorContent, setEditorContent] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const MAX_FILE_SIZE_MB = 10;

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

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

        formData.append('content', editorContent);
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
        <form ref={ref} action={handleSubmit} className="space-y-5 py-10 px-3">
            <Select name="category" required>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoria" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="politica">politica</SelectItem>
                    <SelectItem value="deportes">deportes</SelectItem>
                    <SelectItem value="tendencias">tendencias</SelectItem>
                </SelectContent>
            </Select>
            <div>
                <Label htmlFor="title" >Titulo
                    <Input id="title" name='title' />
                </Label>
            </div>
            <div>
                <Label htmlFor="summary">Sumario
                    <Textarea id="summary" name='summary'  required />
                </Label>
            </div>
            <div>
                <Label htmlFor="content">Contenido
                    <Tiptap content={editorContent} onChange={handleEditorChange} />
                </Label>
            </div>
            <div>
                <Label htmlFor="image">Imagen
                    <Input id="image" name='image' type="file"  accept="image/*,video/*" required onChange={handleFileChange}
                    />
                </Label>
            </div>
            <SubmitButton title={'Crear'} />
        </form>
    )
}
