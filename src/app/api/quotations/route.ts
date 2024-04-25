import { connectDB } from "@/lib/mongodb";
import { Quotation } from "@/models/quotes";
import { QuotationType } from "@/types/news.types";
import { handleError } from "@/utils/utils";
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

        // Si no hay cotizaciones existentes, establecer oldQuotation en un objeto vacío
        if (!oldQuotation) {
            oldQuotation = {
                azucarTucuman: {},
                azucarInternacional: {},
                combustible: {}
            };
        }

        // Verificar y calcular diferencias porcentuales para azucarTucuman
        if (quotation.azucarTucuman) {
            for (const [key, value] of Object.entries(quotation.azucarTucuman)) {
                const precioActual = value.precioActual || 0;
                const precioAnterior = oldQuotation.azucarTucuman[key]?.precioActual || 0;
                const diferenciaPorcentual = precioAnterior !== 0 ? (((precioActual - precioAnterior) / precioAnterior) * 100).toFixed(2) : 0;

                oldQuotation.azucarTucuman[key] = {
                    precioActual,
                    precioAnterior,
                    diferenciaPorcentual
                };
            }
        }

        // Verificar y calcular diferencias porcentuales para azucarInternacional
        if (quotation.azucarInternacional) {
            for (const [key, value] of Object.entries(quotation.azucarInternacional)) {
                const precioActual = value.precioActual || 0;
                const precioAnterior = oldQuotation.azucarInternacional[key]?.precioActual || 0;
                const diferenciaPorcentual = precioAnterior !== 0 ? (((precioActual - precioAnterior) / precioAnterior) * 100).toFixed(2) : 0;

                oldQuotation.azucarInternacional[key] = {
                    precioActual,
                    precioAnterior,
                    diferenciaPorcentual
                };
            }
        }

        // Verificar y calcular diferencias porcentuales para combustible
        if (quotation.combustible) {
            for (const [key, value] of Object.entries(quotation.combustible)) {
                const precioActual = value.precioActual || 0;
                const precioAnterior = oldQuotation.combustible[key]?.precioActual || 0;
                const diferenciaPorcentual = precioAnterior !== 0 ? (((precioActual - precioAnterior) / precioAnterior) * 100).toFixed(2) : 0;

                oldQuotation.combustible[key] = {
                    precioActual,
                    precioAnterior,
                    diferenciaPorcentual
                };
            }
        }

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

