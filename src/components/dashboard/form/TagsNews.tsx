import { Delete } from "lucide-react"

interface Props {
    tags: string[],
    handleDeleteTags: (tag: string) => void
}

export default function TagsNews({ tags, handleDeleteTags }: Props) {
    return (
        <div className="mt-2 ">
            {tags.map((tag, index) => (
                <span key={index} className="relative shadow text-blue-600 uppercase mr-2  italic text-sm px-3 py-2 rounded bg-muted-foreground/5" >
                    #{tag}
                    <Delete className="absolute top-0 right-0 w-3 h-3 text-destructive cursor-pointer" onClick={() => handleDeleteTags(tag)} />
                </span>
            ))}
        </div>
    )
}
