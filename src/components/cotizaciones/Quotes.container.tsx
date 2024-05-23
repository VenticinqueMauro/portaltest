import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

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

const formatPortalData = (data: any) => {
    // Filtrar las propiedades _id y __v antes de procesar los datos
    const filteredData = Object.entries(data).reduce((acc: any, [key, value]) => {
        if (key !== '_id' && key !== '__v') {
            acc[key] = value;
        }
        return acc;
    }, {});

    // Transformar los datos filtrados
    return Object.entries(filteredData).map(([key, value]) => {
        let title;
        if (key === 'azucarTucuman') title = 'Azúcar Tucumán';
        else if (key === 'azucarInternacional') title = 'Azúcar Internacional';
        else if (key === 'biocombustible') title = 'Biocombustibles';
        else title = key;

        const variants = Object.entries(value as any).map(([variantKey, variantValue]: [string, any]) => {
            let name, precioActual;
            if (key === 'azucarTucuman') {
                if (variantKey === '50kg') {
                    name = 'Bolsa 50kg';
                    precioActual = `$${variantValue.precioActual} + IVA`;
                } else if (variantKey === '1kg') {
                    name = 'Fracc/1kg';
                    precioActual = `$${variantValue.precioActual} + IVA`;
                } else {
                    name = variantKey;
                    precioActual = `$${variantValue.precioActual}`;
                }
            } else if (key === 'azucarInternacional') {
                if (variantKey === 'londresN5') {
                    name = 'Londres N5';
                    precioActual = `US$${variantValue.precioActual}`;
                } else if (variantKey === 'eeuuN11') {
                    name = 'EEUU N11';
                    precioActual = `US$${variantValue.precioActual}`;
                } else {
                    name = variantKey;
                    precioActual = `US$${variantValue.precioActual}`;
                }
            } else if (key === 'biocombustible') {
                if (variantKey === 'bioetanol de caña') {
                    name = 'Bioetanol de caña';
                    precioActual = `($/L) ${variantValue.precioActual}`;
                } else if (variantKey === 'bioetanol de maiz') {
                    name = 'Bioetanol de maíz';
                    precioActual = `($/L) ${variantValue.precioActual}`;
                } else {
                    name = variantKey;
                    precioActual = variantValue.precioActual;
                }
            } else {
                name = variantKey;
                precioActual = variantValue.precioActual;
            }
            return { name, precioActual };
        });

        return { title, variants };
    });
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

        return responses.data;
    } catch (error) {
        console.error('Error al hacer las consultas:', error);
        return [];
    }
}


export default async function QuotesContainer() {

    const quotations = await getQuotations();
    const portal = await getPortalQuotations();

    const formattedPortalData = formatPortalData(portal[0]);

    return (
        <div className="bg-black px-3 py-3">
            <Carousel className="max-w-7xl mx-auto px-3">
                <CarouselContent className="-ml-1 gap-10">
                    {quotations?.map((quote: QuoteApi) => (
                        <CarouselItem key={quote.nombre + quote.venta} className={`pl-2 md:pl-1 basis-auto `}>
                            <p className="text-tdn bg-white px-3 py-1 rounded md:w-[200px] text-xs md:text-sm  flex justify-center gap-1">
                                <b>{formatName(quote)}:</b> {formatQuote(quote)}
                            </p>
                        </CarouselItem>
                    ))}
                    {formattedPortalData.map((item) => (
                        <CarouselItem key={item.title} className={` pl-2 md:pl-1 basis-auto `}>
                            <Accordion type="single" collapsible >
                                <AccordionItem value={item.title} className="border-none min-w-[200px]">
                                    <AccordionTrigger className="text-tdn bg-white px-3 py-1 rounded w-fit text-xs md:text-sm  space-x-3">
                                        <b>{item.title}</b>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-tdn bg-white px-3 py-1 text-xs md:text-sm  border-none mt-1">
                                        {item.variants.map((variant) => (
                                            <p key={variant.name} >
                                                <b className="font-medium">{variant.name}</b>: {variant.precioActual}
                                            </p>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-white border-none bg-black  hidden xl:flex" />
                <CarouselNext className="text-white border-none bg-black  hidden xl:flex" />
            </Carousel>
        </div>
    )
}
