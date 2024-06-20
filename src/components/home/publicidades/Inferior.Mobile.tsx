import Image from "next/image";
import Link from "next/link";

interface Props {
    link: string;
    url: string;
}
export default function InferiorMobile({ url, link }: Props) {

    const hasUrl = url && url.length > 0;

    return (
        <div className="h-[420px] bg-publicidad col-span-12 flex md:hidden justify-center items-center relative mb-7" >
            {
                hasUrl ? (
                    <div className="relative w-[400px] h-[400px]">
                        <Link href={`${link}`} target='_blank' rel='noreferrer'>
                            <Image
                                src={url}
                                alt={`publicidad`}
                                fill
                                className="cursor-pointer object-cover"
                            />
                        </Link>
                    </div>
                ) : (
                    <span className="text-sm text-muted-foreground flex items-center justify-center">
                        Espacio publicitario disponible
                    </span>
                )
            }
        </div>
    )
}
