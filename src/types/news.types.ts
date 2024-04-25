import { CategoryNews, MediaNews } from "@/models/news";

export type NewsType = {
    _id?: string,
    title: string;
    summary: string;
    content: string;
    status: NewsStatus;
    category: CategoryNews;
    subscribersOnly: boolean;
    highlightedText?: string;
    lastModifiedBy?: string;
    newsLinked?: string[];
    media?: MediaNews;
    author?: string;
    tags?: string[];
    comments?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type AdminUser = {
    _id: string
    email: string;
    password: string;
    fullname: string;
    role: UserRole;
    avatar?: {
        publicId: string;
        url: string
    }
}

export enum NewsStatus {
    PUBLISHED = 'publicado',
    PENDING = 'pendiente',
}

export enum UserRole {
    EDITOR = 'editor',
    WRITER = 'redactor',
    PUBLICIST = 'publicista',
    CHIEF_WRITER = 'redactor en jefe',
    ADMIN = 'admin',
}

export type AzucarTucuman = {
    '50kg': {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number
    },
    '1kg': {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number
    }
};

export type AzucarInternacional = {
    londresN5: {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number
    },
    eeuuN11: {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number
    }
};

export type Combustible = {
    bioetanol: {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number
    },
    petroleo: {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number
    }
};

export type QuotationType = {
    azucarTucuman: AzucarTucuman,
    azucarInternacional: AzucarInternacional,
    combustible: Combustible
}
