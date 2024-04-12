'use client';

import { handleCreateNews } from "@/actions/news/handleCreateNews";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Dispatch, SetStateAction, createRef, useEffect, useState } from "react";
import { toast } from "sonner";
import SelectCategories from "./SelectCategories";
import SubmitButton from "./SubmitButton";
import Tiptap from "./Tiptap";
import SelectLinkedNews from "./SelectLinkedNews";
import { NewsDataTable } from "../news-data-table/Columns";
import { handleEditNews } from "@/actions/news/handleEditNews";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Delete, Trash } from "lucide-react";
import TagsNews from "./TagsNews";


export default function EditNewsForm({ news }: { news: NewsDataTable }) {

    const ref = createRef<HTMLFormElement>();
    const [editorContent, setEditorContent] = useState<string>(news.content);
    const [selectedPortadaFile, setSelectedPortadaFile] = useState<File | null>(null);
    const [selectedContentFile, setSelectedContentFile] = useState<File | null>(null);
    const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<FileList | null>(null);
    const [previewPortadaImageUrl, setPreviewPortadaImageUrl] = useState<any>(null);
    const [previewContentImageUrl, setPreviewContentImageUrl] = useState<any>(null);
    const [previewGalleryImageUrls, setPreviewGalleryImageUrls] = useState<any>(null);
    const [portadaType, setPortadaType] = useState<string>('image');
    const [contentType, setContentType] = useState<string>('image');
    const [clearContent, setClearContent] = useState(false);
    const [LinkedNews, setLinkedNews] = useState<string[] | undefined>(news?.newsLinked);
    const [tags, setTags] = useState<string[]>(news?.tags || []);



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
                // Generar previsualizaciones de las imágenes seleccionadas
                const imageUrls: string[] = [];
                Array.from(selectedFiles).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (typeof reader.result === 'string') {
                            imageUrls.push(reader.result);
                            if (imageUrls.length === selectedFiles.length) {
                                setPreviewGalleryImageUrls(imageUrls);
                            }
                        }
                    };
                    reader.readAsDataURL(file);
                });
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

        formData.append('news', JSON.stringify(news));
        formData.append('content', editorContent);
        formData.append('newsLinked', JSON.stringify(LinkedNews));
        tags.forEach((tag) => {
            if (tag.trim() !== '') {
                formData.append('tags', tag);
            }
        });
        if (selectedGalleryFiles !== null) {
            formData.append('gallery', JSON.stringify(selectedGalleryFiles));
        }
        const response = await handleEditNews(formData)

        if (response.error) {
            toast.error(response.error);
        } else if (response.message) {
            toast.success(response.message);
            ref.current?.reset()
            setSelectedPortadaFile(null);
            setPreviewPortadaImageUrl(null);
            setPreviewContentImageUrl(null);
            setSelectedGalleryFiles(null)
            setPortadaType('image');
            setClearContent(true);
            setLinkedNews([])
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
            toast.warning(response);
        }
    }

    const handleChangeTags = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if ((newValue.endsWith(' ')) && newValue.trim() !== '') {
            setTags([...tags, newValue.trim().toUpperCase()]);
            event.target.value = '';
        }
    };

    const handleDeleteTags = (tag: string) => {

        const filteredTags = tags.filter(tags => tags !== tag)
        setTags(filteredTags)
    }

    return (
        <form ref={ref} action={handleSubmit} className="space-y-5 pb-10 pt-3 px-3">
            <div className="max-w-56">
                <Label htmlFor="category">Categoría*</Label>
                <Select name="category" defaultValue={news.category}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="politica">politica</SelectItem>
                        <SelectItem value="eco & negocios">eco & negocios</SelectItem>
                        <SelectItem value="deportes">deportes</SelectItem>
                        <SelectItem value="tendencias">tendencias</SelectItem>
                        <SelectItem value="portalcana">Portal caña</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="title" >Titulo*</Label>
                <Input className="font-normal" id="title" name='title' defaultValue={news?.title} />
            </div>
            <div>
                <Label htmlFor="summary">Sumario*</Label>
                <Textarea className="font-normal" id="summary" name='summary' defaultValue={news?.summary} />
            </div>
            <div className="max-w-56">
                <Label htmlFor="portada">Portada*</Label>
                <Input id="portada" name='portada' type="file" accept="image/*,video/*" onChange={handlePortadaFileChange}
                />
                {previewPortadaImageUrl && portadaType === 'image' ? (
                    <Image src={previewPortadaImageUrl} alt="Previsualización de portada" className="py-2" width={300} height={200} />
                ) : (
                    news.media?.portada?.url && news.media.portada.type === 'image' ? (
                        <Image src={news.media.portada.url} alt="Previsualización de portada" className="py-2" width={300} height={200} />
                    ) : null
                )}
                {previewPortadaImageUrl && portadaType === 'video' ? (
                    <video width="300" height="200" controls>
                        <source src={previewPortadaImageUrl} type="video/mp4" />
                        Tu navegador no soporta la etiqueta de video.
                    </video>
                ) : null}
            </div>
            <div>
                <Label htmlFor="content">Contenido*</Label>
                <Tiptap content={editorContent} onChange={handleEditorChange} handleContentFileChange={handleContentFileChange} imageUrl={previewContentImageUrl} type={contentType} clearContent={clearContent} />
            </div>
            <div >
                <Label htmlFor="gallery">Galería de imágenes (opcional)</Label>
                <Input id="gallery" name="gallery" type="file" multiple accept="image/*" className="w-56" onChange={handleGalleryFilesChange} />
                <div className="flex items-center gap-3 py-2">
                    {previewGalleryImageUrls?.map((imageUrl: string, index: number) => (
                        <Image key={index} src={imageUrl} alt={`Preview ${index + 1}`} width={300} height={200} className="object-contain w-36" />
                    ))}
                </div>
            </div>
            <hr />
            <SelectLinkedNews LinkedNews={LinkedNews} setLinkedNews={setLinkedNews as Dispatch<SetStateAction<string[]>> | undefined} id={news.id} />
            <hr />
            <div>
                <Label htmlFor="title" >Tags (opcional)</Label>
                <Input className="font-normal" id="title" name='tags' placeholder="Agrega etiquetas y presiona 'espacio' para generar una nueva" onChange={handleChangeTags} />
                <TagsNews tags={tags} handleDeleteTags={handleDeleteTags} />
            </div>
            <SubmitButton title={'Editar Noticia'} />
        </form>
    )
}