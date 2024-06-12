import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AdminUser, Comment } from "@/types/news.types";
import { ClientUser } from "@/utils/utils";
import { Trash2 } from 'lucide-react';

interface Props {
    user: ClientUser;
    adminUser: AdminUser;
    comment: Comment;
    newsId: string;
    category: string;
    handleCommentDelete: (commentId: string, newsId: string, category: string) => void;
}

export function DialogDeleteComment({ user, adminUser, comment, newsId, category, handleCommentDelete }: Props) {
    if (user && user.id === comment.author.id || (adminUser && adminUser.role === 'admin')) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" size='icon' className='absolute top-0 right-0 border-none' >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará permanentemente el comentario.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleCommentDelete(comment._id, newsId, category)}>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }
    return null;
}
