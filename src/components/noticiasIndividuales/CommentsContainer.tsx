'use client';

import { handleCreateComments } from "@/actions/comments/handleCreateComments";
import { handleDelete } from "@/actions/comments/handleDelete";
import { AdminUser, Comment } from "@/types/news.types";
import { ClientUser } from "@/utils/utils";
import Link from "next/link";
import { createRef } from "react";
import { toast } from "sonner";
import { UserContextType, useUser } from "../provider/ContextProvider";
import { Textarea } from "../ui/textarea";
import { DialogDeleteComment } from "./DialogDeleteComment";
import SubmitComment from "./SubmitComment";

function relativeTime(date: string): string {
    const now = new Date();
    const pastDate = new Date(date);

    if (isNaN(pastDate.getTime())) {
        return 'Fecha inválida';
    }

    const secondsPast = (now.getTime() - pastDate.getTime()) / 1000;

    if (secondsPast < 60) {
        return 'hace unos segundos';
    }
    if (secondsPast < 3600) {
        return `hace ${Math.floor(secondsPast / 60)} minutos`;
    }
    if (secondsPast < 86400) {
        const hours = Math.floor(secondsPast / 3600);
        return `hace ${hours} ${hours > 1 ? 'horas' : 'hora'}`;
    }
    const daysPast = Math.floor(secondsPast / 86400);
    if (daysPast < 7) {
        return `hace ${daysPast} ${daysPast > 1 ? 'días' : 'día'}`;
    }
    const weeksPast = Math.floor(daysPast / 7);
    if (weeksPast < 4) {
        return `hace ${weeksPast} ${weeksPast > 1 ? 'semanas' : 'semana'}`;
    }
    const monthsPast = Math.floor(daysPast / 30); 
    if (monthsPast < 12) {
        return `hace ${monthsPast} ${monthsPast > 1 ? 'meses' : 'mes'}`;
    }
    const yearsPast = Math.floor(daysPast / 365); 
    return `hace ${yearsPast} ${yearsPast > 1 ? 'años' : 'año'}`;
}


interface Props {
    comments?: Comment[];
    id: string;
    category: string;
}

export default function CommentsContainer({ comments, id, category }: Props) {
    const context: UserContextType = useUser();
    const { user, adminUser }: { user: ClientUser, adminUser: AdminUser } = context;
    const ref = createRef<HTMLFormElement>();

    const handleSubmit = async (formData: FormData) => {
        formData.append('newsId', id);
        formData.append('category', category);
        formData.append('userId', user.id);
        const res = await handleCreateComments(formData);
        if (res.error) {
            toast.error(res.error);
        } else if (res.message) {
            toast.success(res.message);
            ref.current?.reset();
        } else {
            toast.warning('Algo salió mal');
        }
    }

    const handleCommentDelete = async (newsId: string, commentId: string, category: string) => {
        const res = await handleDelete(newsId, commentId, category);

        if (res.error) {
            toast.error(res.error);
        } else if (res.message) {
            toast.success(res.message);
        } else {
            toast.warning('Algo salió mal');
        }
    }


    return (
        <div className="w-full bg-white rounded border py-3 my-4 px-3 text-sm">
            <h3 className="font-bold">Comentarios</h3>

            {/* Mostrar comentarios existentes */}
            {comments && comments.length > 0 ? (
                <div className="flex flex-col">
                    {comments.map((comment, index) => (
                        comment.author && comment.author.fullname && comment.content ? (
                            <div key={comment._id} className="border rounded p-3 ml-3 my-3 relative">
                                <div className="flex gap-3 items-end">
                                    <h3 className="font-bold">{comment.author.fullname}</h3>
                                    <span className="text-muted-foreground text-xs font-medium">•&nbsp;&nbsp;{relativeTime(comment.createdAt)}</span>
                                </div>
                                <p className="text-gray-600 mt-2">{comment.content}</p>
                                <DialogDeleteComment
                                    user={user}
                                    adminUser={adminUser}
                                    comment={comment}
                                    newsId={id}
                                    category={category}
                                    handleCommentDelete={handleCommentDelete}
                                />
                            </div>
                        ) : null
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 mt-2">Sin comentarios aún. ¡Sé el primero en comentar!</p>
            )}

            {/* Mostrar formulario para añadir un nuevo comentario si el usuario está verificado */}
            {user && user.emailVerified ? (
                <form ref={ref} action={handleSubmit}>
                    <div className="w-full my-2 p-3">
                        <Textarea
                            className="bg-gray-100 rounded border border-gray-200 leading-normal resize-none w-full h-20 p-3 font-medium placeholder-gray-700/60 focus:outline-none focus:bg-white"
                            name="content"
                            placeholder="Escribe tu comentario aquí"
                            required
                        ></Textarea>
                    </div>

                    <div className="w-full flex justify-end px-3">
                        <SubmitComment title='Publicar' />
                    </div>
                </form>
            ) : (
                <span className="text-muted-foreground mt-2">
                    Debes estar <Link href="/signup" className="text-blue-500 hover:underline">registrado</Link> para dejar un comentario.
                </span>
            )}
        </div>
    );
}
