import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { blurImage } from "@/utils/blurImage";
import Image from "next/image";

interface Props {
    gallery?: Array<{
        publicId: string;
        url: string;
        type: "image";
    }>;
}

export default function Gallery({ gallery }: Props) {

    if (!gallery || !gallery.length) {
        return null;
    }

    return (
        <div className="py-5">
            <div >
                <Carousel className="relative">
                    <CarouselContent className="-ml-1 flex gap-4 ">
                        {gallery.map((item) => (
                            <CarouselItem key={item.publicId} className="pl-2 md:pl-1  md:hover:shadow md:hover:bg-gray-50 transition-all duration-100 ">
                                <div className="rounded flex flex-col justify-start gap-1">
                                    <Image
                                        src={item.url}
                                        alt={item.type}
                                        width={856}
                                        height={422}
                                        className="rounded aspect-video object-cover"
                                        placeholder="blur"
                                        blurDataURL={blurImage}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {
                        gallery.length > 1 &&
                        <>
                            <CarouselPrevious className="absolute top-1/2 left-0  transform -translate-y-1/2 mx-3" />
                            <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 mx-3" />
                        </>
                    }
                </Carousel>
            </div>

        </div>
    )
}
