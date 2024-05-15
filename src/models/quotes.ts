import { AzucarInternacional, AzucarTucuman, Biocombustible } from "@/types/news.types";
import { Document, Schema, model, models } from "mongoose";


interface QuotationsDocument extends Document {
    azucarTucuman: AzucarTucuman,
    azucarInternacional: AzucarInternacional,
    biocombustible: Biocombustible,
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
    biocombustible: {
        "bioetanol de caña": {
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
        "bioetanol de maiz": {
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
