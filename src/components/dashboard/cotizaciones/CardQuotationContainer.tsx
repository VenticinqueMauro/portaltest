import { QuotationType } from "@/types/news.types";
import CardQuotation from "./CardQuotation";


interface Props {
    quotations: QuotationType | undefined
}

export default function CardQuotationContainer({ quotations }: Props) {

    const titleTuc = quotations?.azucarTucuman && "Azúcar Tucumán"
    const titleInt = quotations?.azucarInternacional && "Azúcar Internacional"
    const titleCom = quotations?.combustible && "Combustibles"

    const title50kg = quotations?.azucarTucuman["50kg"] && 'Bolsa 50kg'
    const title1kg = quotations?.azucarTucuman["1kg"] && 'Fracc/1kg'
    const titleLond = quotations?.azucarInternacional.londresN5 && 'Londres N5'
    const titleEeuu = quotations?.azucarInternacional.eeuuN11 && 'EEUU N11'
    const titleBio = quotations?.combustible.bioetanol && 'Bioetanol ($/L)'
    const titlePet = quotations?.combustible.petroleo && 'Petróleo'

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


    return (
        <div className="flex items-center gap-4">
            <CardQuotation globalTitle={titleTuc} titleQuote1={title50kg} titleQuote2={title1kg} priceQuote1={price50kg} priceQuote2={price1kg} percentageQuote1={quotations?.azucarTucuman["50kg"].diferenciaPorcentual} percentageQuote2={quotations?.azucarTucuman["1kg"].diferenciaPorcentual} dateQuote1={dateTuc50kg} dateQuote2={dateTuc1kg} />

            <CardQuotation globalTitle={titleInt} titleQuote1={titleLond} titleQuote2={titleEeuu} priceQuote1={priceLond} priceQuote2={priceEeuu} percentageQuote1={quotations?.azucarInternacional.londresN5.diferenciaPorcentual} percentageQuote2={quotations?.azucarInternacional.eeuuN11.diferenciaPorcentual} dateQuote1={dateLond} dateQuote2={dateEeuu} />

            <CardQuotation globalTitle={titleCom} titleQuote1={titleBio} titleQuote2={titlePet} priceQuote1={priceBio} priceQuote2={pricePet} percentageQuote1={quotations?.combustible.bioetanol.diferenciaPorcentual} percentageQuote2={quotations?.combustible.petroleo.diferenciaPorcentual} dateQuote1={dateBio} dateQuote2={datePet} />
        </div>
    )
}
