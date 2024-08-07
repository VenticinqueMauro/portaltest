'use client'

import { Toggle } from "@/components/ui/toggle"
import { Editor } from "@tiptap/react"
import { Bold, Heading3, Heading4, Heading5, Heading6, Highlighter, ImagePlus, Italic, List, ListOrdered, MessageSquareQuote, Minus, Pilcrow, Redo, Strikethrough, Undo, WrapText } from "lucide-react"

interface Props {
    editor: Editor | null
    imageUrl: string | null
    handleContentFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ToolbarTiptap({ editor, imageUrl, handleContentFileChange }: Props) {

    if (!editor) {
        return null
    }

    return (
        <div className="border border-input bg-transparent mb-2 gap-1 flex w-fit">
            <Toggle
                size='sm'
                pressed={editor.isActive('bold')}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('italic')}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('strike')}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('paragraph')}
                onPressedChange={() => editor.chain().focus().setParagraph().run()}
            >
                <Pilcrow className="w-4 h-4" />
            </Toggle>
            {/* <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <Heading1 className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 className="w-4 h-4" />
            </Toggle> */}
            <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                <Heading3 className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 4 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            >
                <Heading4 className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 5 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            >
                <Heading5 className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 6 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            >
                <Heading6 className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('BlockQuote')}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <MessageSquareQuote className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('bulletList')}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('orderedList')}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <Minus className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                onPressedChange={() => editor.chain().focus().setHardBreak().run()}
            >
                <WrapText className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('highlight')}
                onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
            >
                <Highlighter className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                className="relative"
                disabled={editor.getHTML().includes('img')}
            >
                <label htmlFor="imgContent" className="cursor-pointer block w-full ">
                    <ImagePlus className="w-4 h-4" />
                    <input id="imgContent" name='imgContent' className="sr-only" type="file" accept="image/*,video/*" onChange={handleContentFileChange} />
                </label>
            </Toggle>
            <Toggle
                size='sm'
                onPressedChange={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                <Undo className="w-4 h-4" />
            </Toggle>
            <Toggle
                size='sm'
                onPressedChange={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                <Redo className="w-4 h-4" />
            </Toggle>
        </div>
    )
}
