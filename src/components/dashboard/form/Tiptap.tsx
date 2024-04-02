'use client'

import BulletList from '@tiptap/extension-bullet-list'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolbarTiptap from './Toolbar.tiptap'

interface Props {
    content: string;
    onChange: (richtext: string) => void;
}

const Tiptap = ({ content, onChange }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Highlight.configure(),
            ListItem.configure(),
            BulletList.configure({
                itemTypeName: 'listItem',
                keepMarks: true,
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "rounded-md border min-h-[250px] border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        }
    })

    return (
        <div className='flex flex-col justify-stretch '>
            <ToolbarTiptap editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap