import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { blurImage } from "@/utils/blurImage";
import Link from "next/link";

interface Props {
    image: {
        type: "image" | "video";
        url: string;
    },
    pretitle: string;
    title: string;
    category: string;
    path: string;
    id: string;
}

export default function NoticiaPrincipalCategory({ image, pretitle, title, category, path, id }: Props) {

    return (
        <Link href={`${category}/${path}`} className="rounded min-h-full col-span-12 lg:col-span-8">
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
                    <CardDescription className="text-muted-foreground font-bold text-sm">
                        {pretitle}
                    </CardDescription>
                    <CardTitle className="text-3xl">
                        {title}
                    </CardTitle>
                </CardHeader>
            </Card>
        </Link>
    )
}
