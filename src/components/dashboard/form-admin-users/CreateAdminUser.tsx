import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CirclePlus } from "lucide-react"

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
                <div className="grid gap-4 py-4">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Rol</SelectLabel>
                                <SelectItem value="admin">admin</SelectItem>
                                <SelectItem value="redactor en jefe">Redactor en jefe</SelectItem>
                                <SelectItem value="redactor">Redactor</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="publicista">Publicista</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre y Apellido</Label>
                        <Input id="name" type="text" placeholder="Pedro Duarte" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Input id="email" type="text" placeholder="pepeduarte24" required />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@tdn.com</span>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Contrseña</Label>
                        <Input id="password" type="password" placeholder="*******" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Confirmar contraseña</Label>
                        <Input id="password" type="password" placeholder="*******" required />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full">Crear</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
