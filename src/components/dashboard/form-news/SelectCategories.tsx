import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SelectCategories() {
    return (
        <div className="max-w-56">
            <Label htmlFor="category">Categoría*</Label>
            <Select name="category" required>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoría" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                    <SelectItem value="politica">politica</SelectItem>
                    <SelectItem value="eco & negocios">eco & negocios</SelectItem>
                    <SelectItem value="deportes">deportes</SelectItem>
                    <SelectItem value="tendencias">tendencias</SelectItem>
                    <SelectItem value="portalcana">Portal caña</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
