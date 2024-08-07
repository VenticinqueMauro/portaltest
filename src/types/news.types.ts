
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
    path?: string;
    highlightedText?: string;
    lastModifiedBy?: string;
    newsLinked?: string[];
    media?: MediaNews;
    author?: string;
    showAuthor: boolean;
    tags?: string[];
    comments?: Comment[] | [];
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

export type Biocombustible = {
    'bioetanol de caña': {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number,
        updated?: Date
    },
    'bioetanol de maiz': {
        precioActual: number,
        precioAnterior?: number,
        diferenciaPorcentual?: number,
        updated?: Date
    }
};

export type QuotationType = {
    azucarTucuman: AzucarTucuman,
    azucarInternacional: AzucarInternacional,
    biocombustible: Biocombustible
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
    category: string;
    path?: string;
};

export type SidebarItem = {
    id: string;
    media: Media;
    pretitle: string;
    title: string;
    summary: string;
    category: string;
    path?: string;
};

export type SectionNews = {
    mainNews: MainNews;
    gridNews: SidebarItem[];
}

export type SectionNewsMap = {
    politica: SectionNews;
    "eco & negocios": SectionNews;
    deportes: SectionNews;
    tendencias: SectionNews;
    portalcana: SectionNews;
};

export type MainCover = {
    cover: {
        mainNews: MainNews;
        leftSidebar?: SidebarItem[];
        rightSidebar?: SidebarItem[];
    },
    sections?: SectionNewsMap;
};


// PUBLICIDADES 

export type AdPosition = "top" | "side" | "bottom" | undefined;

export enum AdSectionName {
    PORTADA = 'portada',
    POLITICA = 'politica',
    ECONEGOCIOS = 'eco & negocios',
    DEPORTES = 'deportes',
    TENDENCIAS = 'tendencias',
    PORTALCANA = 'portalcana',
}

export type Ad = {
    media?: {
        desktop?: {
            top?: {
                public_id?: string;
                url?: string;
                link?: string;
            },
            side?: {
                public_id?: string;
                url?: string;
                link?: string;
            },
            bottom?: {
                public_id?: string;
                url?: string;
                link?: string;
            }
        };
        mobile?: {
            top?: {
                public_id?: string;
                url?: string;
                link?: string;
            },
            side?: {
                public_id?: string;
                url?: string;
                link?: string;
            },
            bottom?: {
                public_id?: string;
                url?: string;
                link?: string;
            }
        }
    };
};


export type Ads = {
    home: {
        portada?: Ad;
        politica?: Ad;
        'eco & negocios'?: Ad;
        deportes?: Ad;
        tendencias?: Ad;
        portalcana?: Ad;
    }
};

// NEWS VIEWS

export type NewsView = {
    news_id: string;
    views: number;
}

// COMMENTS

export type Comment = {
    author: {
        id: string,
        fullname: string
    },
    _id: string,
    content: string,
    news: string,
    replies: any[],
    taggedUsers: any[],
    createdAt: string,
    reactions: any[],
}