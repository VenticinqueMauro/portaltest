'use client';

import { handleCreateComments } from "@/actions/comments/handleCreateComments";
import { Comment } from "@/types/news.types";
import { ClientUser } from "@/utils/utils";
import Link from "next/link";
import { createRef } from "react";
import { UserContextType, useUser } from "../provider/ContextProvider";
import { Textarea } from "../ui/textarea";
import SubmitComment from "./SubmitComment";

interface Props {
    comments?: Comment[];
    id: string;
    category: string;
}

export default function CommentsContainer({ comments, id, category }: Props) {

    const context: UserContextType = useUser();
    const { user }: { user: ClientUser } = context;
    const ref = createRef<HTMLFormElement>();

    const handleSubmit = async (formData: FormData) => {
        formData.append('newsId', id);
        formData.append('category', category);
        formData.append('userId', user.id);
        await handleCreateComments(formData);
        ref.current?.reset()
    }

    return (
        <div className="w-full bg-white rounded border py-3 my-4 px-3 text-sm">
            <h3 className="font-bold">Comentarios</h3>

            {/* Mostrar comentarios existentes */}
            {comments && comments.length > 0 ? (
                <div className="flex flex-col">
                    {comments.map((comment, index) => (
                        comment.author && comment.author.fullname && comment.content ? (
                            <div key={index} className="border rounded p-3 ml-3 my-3 relative">
                                <div className="flex gap-3 items-center">
                                    <h3 className="font-bold">{comment.author.fullname}</h3>
                                </div>
                                <p className="text-gray-600 mt-2">{comment.content}</p>
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
                    Debes estar  <Link href="/signup" className="text-blue-500 hover:underline">registrado</Link> para dejar un comentario.
                </span>
            )}
        </div>
    );
}
