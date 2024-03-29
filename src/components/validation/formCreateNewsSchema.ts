import { z } from "zod"

export const formCreateNewsSchema = z.object({
    title: z.string().min(3),
    summary: z.string().min(3),
    content: z.string().min(3),
    author: z.string().min(3),
    category: z.array(z.string()),
    tags: z.array(z.string()),
    image: z.string().url(),
    highlightedText: z.string(),
    newsLinked: z.array(z.string()),
})
