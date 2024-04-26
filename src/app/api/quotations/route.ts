import { connectDB } from "@/lib/mongodb";
import { Quotation } from "@/models/quotes";
import { QuotationType } from "@/types/news.types";
import { handleError, updateQuotation } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const quotes = await Quotation.find({});

        if (!quotes) {
            return NextResponse.json({ error: 'No se encontraron cotizaciones' }, { status: 404 });
        }

        return NextResponse.json({ message: "Cotizaciones encontradas", data: quotes });
    } catch (error) {
        return handleError(error);
    }
}

export async function PUT(request: NextRequest) {
    const quotation: QuotationType = await request.json();

    try {
        await connectDB();

        // Buscar la cotización existente
        let oldQuotation: QuotationType | null = await Quotation.findOne({});
        if (!oldQuotation) {
            oldQuotation = {
                azucarTucuman: {
                    "50kg": {
                        precioActual: 0
                    },
                    "1kg": {
                        precioActual: 0
                    }
                },
                azucarInternacional: {
                    londresN5: {
                        precioActual: 0
                    },
                    eeuuN11: {
                        precioActual: 0
                    }
                },
                combustible: {
                    bioetanol: {
                        precioActual: 0
                    },
                    petroleo: {
                        precioActual: 0
                    }
                }
            };
        }

        // Actualizar las cotizaciones
        updateQuotation(oldQuotation, quotation);

        // Actualizar la cotización existente en la base de datos
        const updatedQuotation = await Quotation.findOneAndUpdate({}, oldQuotation, { new: true, upsert: true });

        return NextResponse.json({
            message: "Cotización actualizada con éxito",
            data: updatedQuotation,
        });
    } catch (error) {
        return handleError(error);
    }
}



