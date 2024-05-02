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
            precioActual: {
                type: Number,
                default: 0
            },
            precioAnterior: {
                type: Number,
                default: 0
            },
            diferenciaPorcentual: {
                type: Number,
                default: 0
            },
            updated: Date
        },
        '1kg': {
            precioActual: {
                type: Number,
                default: 0
            },
            precioAnterior: {
                type: Number,
                default: 0
            },
            diferenciaPorcentual: {
                type: Number,
                default: 0
            },
            updated: Date
        }
    },
    azucarInternacional: {
        londresN5: {
            precioActual: {
                type: Number,
                default: 0
            },
            precioAnterior: {
                type: Number,
                default: 0
            },
            diferenciaPorcentual: {
                type: Number,
                default: 0
            },
            updated: Date
        },
        eeuuN11: {
            precioActual: {
                type: Number,
                default: 0
            },
            precioAnterior: {
                type: Number,
                default: 0
            },
            diferenciaPorcentual: {
                type: Number,
                default: 0
            },
            updated: Date
        }
    },
    combustible: {
        bioetanol: {
            precioActual: {
                type: Number,
                default: 0
            },
            precioAnterior: {
                type: Number,
                default: 0
            },
            diferenciaPorcentual: {
                type: Number,
                default: 0
            },
            updated: Date
        },
        petroleo: {
            precioActual: {
                type: Number,
                default: 0
            },
            precioAnterior: {
                type: Number,
                default: 0
            },
            diferenciaPorcentual: {
                type: Number,
                default: 0
            },
            updated: Date
        }
    }
});

export const Quotation = models.Quotation || model<QuotationsDocument>('Quotation', QuotationSchema);
