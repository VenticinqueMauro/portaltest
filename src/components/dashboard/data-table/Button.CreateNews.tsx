import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { CirclePlus } from "lucide-react"

export const ButtonCreateNews = () => {
    return (
        <Sheet>
            <SheetTrigger className="flex py-1inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 border-dashed">
                <CirclePlus size={16} className="mr-1" />
                Nueva noticia
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Crear una nueva noticia</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}