import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import FormChangePasswordUser from "./FormChangePasswordUser"

export function ChangePasswordAdminUser({ email }: { email: string }) {
    return (
        <Dialog>
            <DialogTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
                Cambiar contraseña
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cambiar contraseña</DialogTitle>
                </DialogHeader>
                <FormChangePasswordUser email={email} />
            </DialogContent>
        </Dialog>
    )
}
