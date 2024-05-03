
export type MediaNews = {
    portada: {
        caption?: string;
        publicId: string;
        url: string;
        type: "image" | "video";
    };
    zona1: {
        publicId: string;
        url: string;
        type: "image" | "video";
    };
    zona2: {
        publicId: string;
        url: string;
        type: "image" | "video";
    };
    gallery: Array<{
        publicId: string;
        url: string;
        type: "image";
    }>;
}

export enum CategoryNews {
    POLITICA = 'politica',
    ECONEGOCIOS = 'eco & negocios',
    DEPORTES = 'deportes',
    TENDENCIAS = 'tendencias',
    PORTALCANA = 'portalcana',
}

export type NewsType = {
    _id?: string,
    pretitle: string;
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
        diferenciaPorcentual?: number,
        updated?: Date
    },
    '1kg': {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number,
        updated?: Date
    }
};

export type AzucarInternacional = {
    londresN5: {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number,
        updated?: Date
    },
    eeuuN11: {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number,
        updated?: Date
    }
};

export type Combustible = {
    bioetanol: {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number,
        updated?: Date
    },
    petroleo: {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number,
        updated?: Date
    }
};

export type QuotationType = {
    azucarTucuman: AzucarTucuman,
    azucarInternacional: AzucarInternacional,
    combustible: Combustible
}

// HOME TYPES

export type Media = {
    publicId?: string;
    url: string;
    type?: "image" | "video";
};

export type MainNews = {
    id: string;
    media: Media;
    pretitle: string;
    title: string;
    summary: string;
};

export type SidebarItem = {
    id: string;
    media: Media;
    pretitle: string;
    title: string;
    summary: string;
};

export type MainCover = {
    cover: {
        mainNews: MainNews;
        leftSidebar?: SidebarItem[];
        rightSidebar?: SidebarItem[];
    };
};
