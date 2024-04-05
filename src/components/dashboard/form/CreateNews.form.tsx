'use client';

import { handleCreateNews } from "@/actions/news/handleCreateNews";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { createRef, useEffect, useState } from "react";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";
import Tiptap from "./Tiptap";
import SelectCategories from "./SelectCategories";


export default function CreateNewsForm() {

    const ref = createRef<HTMLFormElement>();
    const [editorContent, setEditorContent] = useState<string>('');
    const [selectedPortadaFile, setSelectedPortadaFile] = useState<File | null>(null);
    const [selectedContentFile, setSelectedContentFile] = useState<File | null>(null);
    const [previewPortadaImageUrl, setPreviewPortadaImageUrl] = useState<any>(null);
    const [previewContentImageUrl, setPreviewContentImageUrl] = useState<any>(null);
    const [portadaType, setPortadaType] = useState<string>('image');
    const [contentType, setContentType] = useState<string>('image');
    const [clearContent, setClearContent] = useState(false);

    useEffect(() => {
        setClearContent(false)
    }, [clearContent]);

    const MAX_FILE_SIZE_MB = 10;

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    const handlePortadaFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`El archivo seleccionado es demasiado grande. Por favor, selecciona un archivo de máximo ${MAX_FILE_SIZE_MB}MB.`);
                event.target.value = '';
            } else {
                setSelectedPortadaFile(file);

                // Previsualización de la imagen
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageUrl = e.target?.result;
                    setPreviewPortadaImageUrl(imageUrl);
                };
                reader.readAsDataURL(file);

                // Detectar el tipo de archivo
                const isImage = file.type.startsWith('image');
                setPortadaType(isImage ? 'image' : 'video');
            }
        };
    }

    const handleContentFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`El archivo seleccionado es demasiado grande. Por favor, selecciona un archivo de máximo ${MAX_FILE_SIZE_MB}MB.`);
                event.target.value = '';
            } else {
                setSelectedContentFile(file);

                // Previsualización de la imagen
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageUrl = e.target?.result;
                    setPreviewContentImageUrl(imageUrl);
                    setSelectedPortadaFile(null);
                };
                reader.readAsDataURL(file);

                const isImage = file.type.startsWith('image');
                setContentType(isImage ? 'image' : 'video');
            }
        };
    }

    const handleSubmit = async (formData: FormData) => {

        formData.append('content', editorContent);
        const response = await handleCreateNews(formData)

        if (response.error) {
            toast.error(response.error);
        } else if (response.message) {
            toast.success(response.message);
            ref.current?.reset()
            setSelectedPortadaFile(null);
            setPreviewPortadaImageUrl(null);
            setPortadaType('image');
            setClearContent(true);
        } else {
            toast.warning(response);
        }
    }

    return (
        <form ref={ref} action={handleSubmit} className="space-y-5 py-10 px-3">
            <SelectCategories />
            <div>
                <Label htmlFor="title" >Titulo*</Label>
                <Input className="font-normal" id="title" name='title' required />
            </div>
            <div>
                <Label htmlFor="summary">Sumario*</Label>
                <Textarea className="font-normal" id="summary" name='summary' required />
            </div>
            <div className="max-w-56">
                <Label htmlFor="portada">Portada*</Label>
                <Input id="portada" name='portada' type="file" accept="image/*,video/*" required onChange={handlePortadaFileChange}
                />
                {previewPortadaImageUrl && portadaType === 'image' && (
                    <Image src={previewPortadaImageUrl} alt="Previsualización de portada" width={300} height={200} />
                )}
                {previewPortadaImageUrl && portadaType === 'video' && (
                    <video width="300" height="200" controls>
                        <source src={previewPortadaImageUrl} type="video/mp4" />
                        Tu navegador no soporta la etiqueta de video.
                    </video>
                )}            </div>
            <div>
                <Label htmlFor="content">Contenido*</Label>
                <Tiptap content={editorContent} onChange={handleEditorChange} handleContentFileChange={handleContentFileChange} imageUrl={previewContentImageUrl} type={contentType} clearContent={clearContent} />
            </div>
            <SubmitButton title={'Crear Nueva Noticia'} />
        </form>
    )
}