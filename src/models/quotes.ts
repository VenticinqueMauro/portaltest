import { AzucarInternacional, AzucarTucuman, Combustible } from "@/types/news.types";
import { Document, Schema, model, models } from "mongoose";


interface QuotationsDocument extends Document {
    azucarTucuman: AzucarTucuman,
    azucarInternacional: AzucarInternacional,
    combustible: Combustible,
}

export const QuotationSchema = new Schema<QuotationsDocument>({
    azucarTucuman: {
        '50kg': {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number,
            updated: Date
        },
        '1kg': {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number,
            updated: Date
        }
    },
    azucarInternacional: {
        londresN5: {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number,
            updated: Date
        },
        eeuuN11: {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number,
            updated: Date
        }
    },
    combustible: {
        bioetanol: {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number,
            updated: Date
        },
        petroleo: {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number,
            updated: Date
        }
    }
});

export const Quotation = models.Quotation || model<QuotationsDocument>('Quotation', QuotationSchema);
