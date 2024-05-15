import { QuotationType } from "@/types/news.types";
import CardQuotation from "./CardQuotation";


interface Props {
    quotations: QuotationType | undefined
}

export default function CardQuotationContainer({ quotations }: Props) {

    const titleTuc = "Azúcar Tucumán"
    const titleInt = "Azúcar Internacional"
    const titleCom = "Biocombustibles"

    const title50kg = 'Bolsa 50kg'
    const title1kg = 'Fracc/1kg'
    const titleLond = 'Londres N5'
    const titleEeuu = 'EEUU N11'
    const titleBio = 'Bioetanol de caña'
    const titlePet = 'Bioetanol de maiz'

    const price50kg = `$${quotations?.azucarTucuman["50kg"].precioActual ?? 0} + IVA`
    const price1kg = `$${quotations?.azucarTucuman["1kg"].precioActual ?? 0} + IVA`
    const priceLond = `US$${quotations?.azucarInternacional.londresN5.precioActual ?? 0}`
    const priceEeuu = `US$${quotations?.azucarInternacional.eeuuN11.precioActual ?? 0}`
    const priceBio = `($/L) ${quotations?.biocombustible['bioetanol de caña'].precioActual ?? 0}`
    const pricePet = `($/L) ${quotations?.biocombustible['bioetanol de maiz'].precioActual ?? 0}`

    const dateTuc50kg = quotations?.azucarTucuman["50kg"].updated;
    const dateTuc1kg = quotations?.azucarTucuman["1kg"].updated;
    const dateLond = quotations?.azucarInternacional.londresN5.updated;
    const dateEeuu = quotations?.azucarInternacional.eeuuN11.updated;
    const dateBio = quotations?.biocombustible['bioetanol de caña'].updated;
    const datePet = quotations?.biocombustible['bioetanol de maiz'].updated;


    return (
        <div className="flex items-center gap-4">
            <CardQuotation globalTitle={titleTuc} titleQuote1={title50kg} titleQuote2={title1kg} priceQuote1={price50kg} priceQuote2={price1kg} percentageQuote1={quotations?.azucarTucuman["50kg"].diferenciaPorcentual} percentageQuote2={quotations?.azucarTucuman["1kg"].diferenciaPorcentual} dateQuote1={dateTuc50kg} dateQuote2={dateTuc1kg} />

            <CardQuotation globalTitle={titleInt} titleQuote1={titleLond} titleQuote2={titleEeuu} priceQuote1={priceLond} priceQuote2={priceEeuu} percentageQuote1={quotations?.azucarInternacional.londresN5.diferenciaPorcentual} percentageQuote2={quotations?.azucarInternacional.eeuuN11.diferenciaPorcentual} dateQuote1={dateLond} dateQuote2={dateEeuu} />

            <CardQuotation globalTitle={titleCom} titleQuote1={titleBio} titleQuote2={titlePet} priceQuote1={priceBio} priceQuote2={pricePet} percentageQuote1={quotations?.biocombustible['bioetanol de caña'].diferenciaPorcentual} percentageQuote2={quotations?.biocombustible['bioetanol de maiz'].diferenciaPorcentual} dateQuote1={dateBio} dateQuote2={datePet} />
        </div>
    )
}
