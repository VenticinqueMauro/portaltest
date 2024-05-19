import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface Props {
    image: {
        type: "image" | "video";
        url: string;
    },
    pretitle: string;
    title: string;
    summary: string;
}

export default function NoticiaCentral({ image, pretitle, title, summary }: Props) {
    return (
        <Card className="rounded min-h-full col-start-3 col-span-8 bg-gray-100 ">
            <div className="px-1">
                <div className="relative -top-2">
                    {
                        image.type !== 'video' ?
                            <Image src={image.url} alt={title} width={400} height={300} />
                            :
                            <video width="400" height="300" controls={false} autoPlay loop className="w-full object-cover aspect-video rounded">
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
                <CardDescription>
                    {summary}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
