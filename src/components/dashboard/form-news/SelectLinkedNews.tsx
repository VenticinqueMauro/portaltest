import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewsType } from "@/types/news.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    id?: string;
    LinkedNews: string[] | undefined;
    setLinkedNews: React.Dispatch<React.SetStateAction<string[]>> | undefined;
}

export default function SelectLinkedNews({ LinkedNews, setLinkedNews, id }: Props) {
    const [allNews, setAllNews] = useState<NewsType[] | undefined>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');



    useEffect(() => {
        const fetchLinkedNews = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news`);
            const { data } = await response.json();
            const filteredNews = data.filter((news: NewsType) => news._id !== id)
            setAllNews(filteredNews)
        }

        fetchLinkedNews();
    }, [id])



    const handleNewsSelect = (isChecked: boolean, newsId: string) => {
        if (LinkedNews && setLinkedNews) {
            if (isChecked) {
                if (LinkedNews.length < 3) {
                    setLinkedNews(prevSelected => [...prevSelected, newsId]);
                } else {
                    toast.warning("Ya has seleccionado el máximo de noticias permitidas.");
                }
            } else {
                setLinkedNews(prevSelected => prevSelected.filter(id => id !== newsId));
            }
        }
    };

    const filteredNews = allNews?.filter(news => {
        const titleMatch = news.title.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = news.category.includes(searchTerm.toLowerCase());

        return titleMatch || categoryMatch;
    });


    if (!allNews?.length) return null;

    return (
        <>
            <Carousel
                id="newsLinked"
                opts={{
                    align: "center",
                }}
                className="w-full max-w-7xl"
            >
                <Label htmlFor="newsLinked">Noticias Vinculadas (opcional)</Label>
                <Input
                    placeholder="Buscar por título o categoría"
                    className="w-56 my-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CarouselContent>
                    {filteredNews?.map((news) => (
                        <CarouselItem key={news._id} className="md:basis-64 h-auto">
                            <div className="p-1">
                                <Card className="rounded-none">
                                    <CardContent className="flex flex-col gap-1 aspect-square items-start justify-start py-2 relative">
                                        <Checkbox
                                            id={`checkbox_${news._id}`}
                                            value={news._id}
                                            checked={LinkedNews?.includes(news._id as string)}
                                            onCheckedChange={(isChecked) => handleNewsSelect(isChecked as boolean, news._id as string)}
                                            className="absolute top-2 right-2"
                                        />
                                        <div>
                                            <span className="text-base font-semibold line-clamp-4">{news.title}</span>
                                            <span className="text-sm line-clamp-5">{news.summary}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious type="button" />
                <CarouselNext type="button" />
            </Carousel>
        </>
    )
}
