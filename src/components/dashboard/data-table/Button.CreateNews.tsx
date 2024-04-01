import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { CirclePlus } from "lucide-react"
import CreateNewsForm from "../form/CreateNews.form"

export const ButtonCreateNews = () => {
    return (
        <Sheet>
            <SheetTrigger className="flex py-1inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 border-dashed">
                <CirclePlus size={16} className="mr-1" />
                Nueva noticia
            </SheetTrigger>
            <SheetContent className="min-w-full h-full ">
                <SheetHeader>
                    <SheetTitle>Crear una nueva noticia</SheetTitle>
                    <div className="flex  gap-5">
                        <div className="flex-1 max-h-[90vh] overflow-y-auto border-r rounded pr-3">
                            {/* Contenido del primer div */}

                        </div>
                        <div className="flex-1">
                            <CreateNewsForm />
                        </div>
                    </div>

                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}