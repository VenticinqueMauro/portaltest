'use client';

import { handleCreateNews } from "@/actions/news/handleCreateNews";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { createRef, useEffect, useState } from "react";
import { toast } from "sonner";
import SelectCategories from "./SelectCategories";
import SubmitButton from "./SubmitButton";
import Tiptap from "./Tiptap";
import SelectLinkedNews from "./SelectLinkedNews";


export default function CreateNewsForm() {

    const ref = createRef<HTMLFormElement>();
    const [editorContent, setEditorContent] = useState<string>('');
    const [selectedPortadaFile, setSelectedPortadaFile] = useState<File | null>(null);
    const [selectedContentFile, setSelectedContentFile] = useState<File | null>(null);
    const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<FileList | null>(null);
    const [previewPortadaImageUrl, setPreviewPortadaImageUrl] = useState<any>(null);
    const [previewContentImageUrl, setPreviewContentImageUrl] = useState<any>(null);
    const [portadaType, setPortadaType] = useState<string>('image');
    const [contentType, setContentType] = useState<string>('image');
    const [clearContent, setClearContent] = useState(false);
    const [LinkedNews, setLinkedNews] = useState<string[]>([]);




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

    const handleGalleryFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;

        if (selectedFiles && selectedFiles.length >= 3) {
            const oversizedFiles = Array.from(selectedFiles).filter(file => file.size > MAX_FILE_SIZE_MB * 1024 * 1024);

            if (oversizedFiles.length > 0) {
                const filenames = oversizedFiles.map(file => file.name).join(', ');
                toast.error(`Los siguientes archivos son demasiado grandes: ${filenames}. Por favor, selecciona archivos de máximo ${MAX_FILE_SIZE_MB}MB.`);
                event.target.value = '';
            } else {
                setSelectedGalleryFiles(selectedFiles);
            }
        } else {
            toast.error('Por favor, selecciona al menos 3 archivos de imagen.');
            event.target.value = '';
        }
    };

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
        formData.append('newsLinked', JSON.stringify(LinkedNews));
        if (selectedGalleryFiles !== null) {
            formData.append('gallery', JSON.stringify(selectedGalleryFiles));
        }
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
            setLinkedNews([])
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
                )}
            </div>
            <div>
                <Label htmlFor="content">Contenido*</Label>
                <Tiptap content={editorContent} onChange={handleEditorChange} handleContentFileChange={handleContentFileChange} imageUrl={previewContentImageUrl} type={contentType} clearContent={clearContent} />
            </div>
            <div className="w-56">
                <Label htmlFor="gallery">Galería de imagenes (opcional)</Label>
                <Input id="gallery" name='gallery' type="file" multiple accept="image/*" onChange={handleGalleryFilesChange} />
            </div>
            <SelectLinkedNews LinkedNews={LinkedNews} setLinkedNews={setLinkedNews} />
            <SubmitButton title={'Crear Nueva Noticia'} />
        </form>
    )
}