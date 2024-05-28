import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { blurImage } from "@/utils/blurImage";
import Link from "next/link";

interface Props {
    image: {
        type: "image" | "video";
        url: string;
    },
    pretitle: string;
    title: string;
    summary: string;
    category: string;
    path: string;
}

export default function NoticiaCentral({ image, pretitle, title, summary, category, path }: Props) {
    return (
        <Link className="rounded min-h-full col-start-1 col-span-12 lg:col-start-3 lg:col-span-8 " href={`${category}/${path}`}>
            <Card className="bg-gray-100 hover:bg-gray-200 transition-all duration-100">
                <div className="px-1">
                    <div className="relative -top-2">
                        {
                            image.type !== 'video' ?
                                <Image src={image.url} alt={title} width={400} height={300} placeholder="blur"
                                    blurDataURL={blurImage} className="object-cover rounded w-full aspect-video" />
                                :
                                <video width="400" height="300" controls={true} autoPlay loop className="w-full object-cover aspect-video rounded">
                                    <source src={image.url} type="video/mp4" />
                                    Tu navegador no soporta la etiqueta de video.
                                </video>
                        }
                    </div>
                </div>
                <CardHeader className="text-center">
                    <CardDescription className="text-muted-foreground font-medium text-sm">
                        {pretitle}
                    </CardDescription>
                    <CardTitle className="text-3xl">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                        {summary}
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}
