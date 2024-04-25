import { AzucarInternacional, AzucarTucuman, Combustible, UserRole } from "@/types/news.types";
import { Schema, model, models, Document } from "mongoose";


interface QuotationsDocument extends Document {
    azucarTucuman: AzucarTucuman,
    azucarInternacional: AzucarInternacional,
    combustible: Combustible
}

export const QuotationSchema = new Schema<QuotationsDocument>({
    azucarTucuman: {
        '50kg': {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number
        },
        '1kg': {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number
        }
    },
    azucarInternacional: {
        londresN5: {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number
        },
        eeuuN11: {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number
        }
    },
    combustible: {
        bioetanol: {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number
        },
        petroleo: {
            precioActual: Number,
            precioAnterior: Number,
            diferenciaPorcentual: Number
        }
    }
});

export const Quotation = models.Quotation || model<QuotationsDocument>('Quotation', QuotationSchema);
