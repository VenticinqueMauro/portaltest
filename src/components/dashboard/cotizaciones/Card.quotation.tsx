import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { QuotationType } from "@/types/news.types"
import { Clock3, TrendingDown, TrendingUp } from "lucide-react"

interface Quotation {
    title: string;
    items: { title: string; price: string; percentage: string | undefined; date: string | undefined }[];
}

interface Props {
    quotations: QuotationType | undefined
}

export default function CardQuotation({ quotations }: Props) {

    const titleTuc = quotations?.azucarTucuman && "Azucar Tucuman"
    const titleInt = quotations?.azucarInternacional && "Azucar Internacional"
    const titleCom = quotations?.combustible && "Combustibles"

    const title50kg = quotations?.azucarTucuman["50kg"] && 'Bolsa 50kg '
    const title1kg = quotations?.azucarTucuman["1kg"] && 'Fracc/1kg '
    const titleLond = quotations?.azucarInternacional.londresN5 && 'Londres N5'
    const titleEeuu = quotations?.azucarInternacional.eeuuN11 && 'EEUU N1'
    const titleBio = quotations?.combustible.bioetanol && 'Bioetanol'
    const titlePet = quotations?.combustible.petroleo && 'Petroleo'

    const price50kg = `$${quotations?.azucarTucuman["50kg"].precioActual} + IVA`
    const price1kg = `$${quotations?.azucarTucuman["1kg"].precioActual} + IVA`
    const priceLond = `US$${quotations?.azucarInternacional.londresN5.precioActual}`
    const priceEeuu = `US$${quotations?.azucarInternacional.eeuuN11.precioActual}`
    const priceBio = `US$${quotations?.combustible.bioetanol.precioActual}`
    const pricePet = `US$${quotations?.combustible.petroleo.precioActual}`

    const dateTuc50kg = quotations?.azucarTucuman["50kg"].updated;
    const dateTuc1kg = quotations?.azucarTucuman["1kg"].updated;
    const dateLond = quotations?.azucarInternacional.londresN5.updated;
    const dateEeuu = quotations?.azucarInternacional.eeuuN11.updated;
    const dateBio = quotations?.combustible.bioetanol.updated;
    const datePet = quotations?.combustible.petroleo.updated;

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        const today = new Date();

        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return `Hoy, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return `${date.toLocaleDateString('es-ES', { weekday: 'long' })} ${date.getDate()}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
    };

    const formatPercentaje = (value: number | undefined) => {
        if (value === 0) return '';
        return `${value}%`;
    };

    return (
        <div className="flex items-center gap-4">
            <Card >
                <CardHeader>
                    <CardTitle className="flex items-center gap-1 justify-between">
                        {titleTuc}
                        <div className="text-xs flex gap-1 text-muted-foreground font-normal px-2 py-1 rounded bg-muted">
                            <Clock3 className="w-4 h-4" />
                            <span>
                                {dateTuc50kg && formatDate(dateTuc50kg)}
                            </span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                    <div className="flex gap-1 justify-between">
                        <div>
                            {title50kg}
                            <b>{price50kg}</b>
                        </div>
                        <span className="text-xs p-1 text-green-500 flex gap-1">{formatPercentaje(quotations?.azucarTucuman["50kg"].diferenciaPorcentual)}<TrendingUp className="w-4 h-4" /></span>
                    </div>
                    <div className="flex gap-1 justify-between">
                        <div>
                            {title1kg}
                            <b>{price1kg}</b>
                        </div>
                        <span className="text-xs p-1 text-red-500 flex gap-1">{formatPercentaje(quotations?.azucarTucuman["1kg"].diferenciaPorcentual)}<TrendingDown className="w-4 h-4" /></span>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-1 justify-between">
                        {titleInt}
                        <div className="text-xs flex gap-1 text-muted-foreground font-normal px-2 py-1 rounded bg-muted">
                            <Clock3 className="w-4 h-4" />
                            <span>
                                {dateLond && formatDate(dateLond)}
                            </span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                    <span>{titleLond} <b>{priceLond}</b>  {formatPercentaje(quotations?.azucarInternacional.londresN5.diferenciaPorcentual)}</span>
                    <span>{titleEeuu} <b>{priceEeuu}</b>  {formatPercentaje(quotations?.azucarInternacional.eeuuN11.diferenciaPorcentual)}</span>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-1 justify-between">
                        {titleCom}
                        <div className="text-xs flex gap-1 text-muted-foreground font-normal px-2 py-1 rounded bg-muted">
                            <Clock3 className="w-4 h-4" />
                            <span>
                                {dateBio && formatDate(dateBio)}
                            </span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                    <span>{titleBio} <b>{priceBio}</b>  {formatPercentaje(quotations?.combustible.bioetanol.diferenciaPorcentual)}</span>
                    <span>{titlePet} <b>{pricePet}</b>  {formatPercentaje(quotations?.combustible.petroleo.diferenciaPorcentual)}</span>
                </CardContent>
            </Card>
        </div>
    )
}
