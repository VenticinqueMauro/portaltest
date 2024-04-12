import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { CirclePlus } from "lucide-react"
import FormCreateUser from "./FormCreateUser"

export function CreateAdminUser() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-foreground flex py-1inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 border-dashed">
                    <CirclePlus size={16} className="mr-1" />
                    Nuevo Usuario
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear nuevo usario</DialogTitle>
                </DialogHeader>
                <FormCreateUser />
            </DialogContent>
        </Dialog>
    )
}
