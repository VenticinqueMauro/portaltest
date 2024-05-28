'use client'

import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Image from '@tiptap/extension-image'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import ToolbarTiptap from './Toolbar.tiptap'

interface Props {
    content: string;
    imageUrl: any
    type: string
    clearContent: boolean
    onChange: (richtext: string) => void;
    handleContentFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Tiptap = ({ content, imageUrl, type, clearContent, onChange, handleContentFileChange }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: "text-lg"
                    }
                }
            }),
            TaskList,
            TaskItem,
            Highlight.configure(),   
            Image.configure({
                HTMLAttributes: {
                    width: 400,
                    height: 300,
                    alt: 'Imagen de prueba',
                    class: 'object-cover',
                }
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "rounded-md border min-h-[250px] border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-normal"
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
            console.log(editor.getHTML())
        }
    })


    useEffect(() => {
        if (imageUrl && type === 'image') {
            editor?.chain().focus().setImage({ src: imageUrl }).run()
        } else if (imageUrl && type === 'video') {
            editor?.chain().focus().setImage({ src: "/default-video.jpg" }).run()
        }
    }, [editor, imageUrl, type])

    useEffect(() => {
        if (clearContent === true) {
            editor?.commands.clearContent(clearContent)
        }
    }, [clearContent, editor])

    return (
        <div className='flex flex-col justify-stretch'>
            <ToolbarTiptap editor={editor} handleContentFileChange={handleContentFileChange} imageUrl={imageUrl} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap