import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";

const urls = [
    "https://dolarapi.com/v1/dolares/oficial",
    "https://dolarapi.com/v1/dolares/blue",
    "https://dolarapi.com/v1/dolares/tarjeta",
    "https://dolarapi.com/v1/cotizaciones/eur",
    "https://dolarapi.com/v1/cotizaciones/brl"
];

const currencySymbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    BRL: 'R$'
};

const formatNameMap: Record<string, string> = {
    'USD_oficial': 'Dólar Oficial',
    'USD_blue': 'Dólar Blue',
    'USD_tarjeta': 'Dólar Tarjeta',
    'EUR_oficial': 'Euro Oficial',
    'BRL_oficial': 'Real Oficial'
};

const formatQuote = (quote: QuoteApi) => {
    const symbol = currencySymbols[quote.moneda];
    return `${symbol}${quote.venta}`;
};

const formatName = (quote: QuoteApi) => {
    const key = `${quote.moneda}_${quote.casa}`;
    return formatNameMap[key] || quote.nombre;
};

type Currency = 'USD' | 'EUR' | 'BRL';
type QuoteApi = {
    moneda: Currency,
    casa: string,
    nombre: string,
    compra: number,
    venta: number,
    fechaActualizacion: string
}

async function getQuotations(): Promise<QuoteApi[]> {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url, { next: { revalidate: 3600 } }).then(response => response.json())));
        return responses;
    } catch (error) {
        console.error('Error al hacer las consultas:', error);
        return [];
    }
}
async function getPortalQuotations(): Promise<QuoteApi[]> {
    try {
        const responses = await fetch(`${process.env.NEXT_PUBLIC_URL}api/quotations`, { next: { revalidate: 3600 } }).then(response => response.json());

        return responses;
    } catch (error) {
        console.error('Error al hacer las consultas:', error);
        return [];
    }
}


export default async function QuotesContainer() {

    const quotations = await getQuotations();
    const portal = await getPortalQuotations();

    return (
        <div className="bg-black px-3 py-3 lg:px-0">
            <Carousel className="max-w-7xl mx-auto">
                <CarouselContent className="-ml-1">
                    {quotations?.map((quote: QuoteApi) => (
                        <CarouselItem key={quote.nombre + quote.venta} className="pl-2 md:pl-1 basis-auto lg:basis-1/5">
                            <p className="text-tdn bg-white px-3 py-1 rounded w-fit text-sm md:text-base">
                                <b>{formatName(quote)}:</b> {formatQuote(quote)}
                            </p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
