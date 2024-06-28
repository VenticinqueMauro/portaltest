import { fontLato } from "@/app/fonts";
import { blurImage } from "@/utils/blurImage";
import Image from "next/image";
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

export default function NoticiasGridCategory({ image, pretitle, title, category, path, id }: Props) {
    return (
        <Link href={`${category}/${path}`} className="col-span-6 w-full space-y-2 md:hover:shadow md:hover:bg-gray-50 transition-all duration-100 cursor-pointer shadow rounded">
            {
                image.type !== 'video' ? (
                    <Image
                        src={image.url}
                        alt={title}
                        width={400}
                        height={300}
                        className="w-full object-cover aspect-video rounded"
                        placeholder="blur"
                        blurDataURL={blurImage}
                        loading="lazy"
                    />
                ) : (
                    <video width="400" height="300" controls={true} autoPlay loop className="w-full object-cover aspect-video rounded">
                        <source src={image.url} type="video/mp4" />
                        Tu navegador no soporta la etiqueta de video.
                    </video>
                )
            }
            <div className="p-2">
                <p className={`${fontLato.className} text-sm font-medium text-muted-foreground`}>
                    {pretitle}
                </p>
                <p className="font-semibold tracking-tight line-clamp-3">
                    {title}
                </p>
            </div>
        </Link>
    )
}
