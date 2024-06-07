import { QuotationType } from "@/types/news.types";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


// Función para manejar errores backend
export const handleError = (error: any) => {
    if (error instanceof Error) {
        return NextResponse.json({
            error: `${error.message}`
        }, {
            status: 400
        });
    } else {
        // Registra el error para futuras investigaciones
        return NextResponse.json({
            error: 'Ha ocurrido un error inesperado'
        }, {
            status: 500
        });
    }
};


// Funcion para formatear fechas

export function formatDate(date: Date) {
    const options: any = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Argentina/Buenos_Aires'
    };
    return date.toLocaleDateString('es-AR', options);
}


// Funcion para decodificar token administrador

export function decodeToken() {
    const token = cookies().get("portal_app")?.value;
    if (!token) {
        return { error: 'No autorizado' };
    }
    const decodedToken: any = verify(token, `${process.env.JWT_KEY}`);
    return decodedToken;
}


// Funcion para calcular cotizaciones

export function updateQuotation(oldQuotation: QuotationType, newQuotation: QuotationType) {
    const types = Object.keys(newQuotation) as (keyof QuotationType)[];
    const currentDate = new Date();

    types.forEach(type => {
        const currentQuotation = newQuotation[type];
        const oldQuotationOfType = oldQuotation[type];

        if (currentQuotation) {
            Object.entries(currentQuotation).forEach(([key, value]) => {
                const precioActual = value.precioActual || 0;
                const precioAnterior = (oldQuotationOfType as any)[key]?.precioActual || 0;
                const diferenciaPorcentual = precioAnterior !== 0 ? (((precioActual - precioAnterior) / precioAnterior) * 100).toFixed(2) : 0;

                (oldQuotationOfType as any)[key] = {
                    precioActual,
                    precioAnterior,
                    diferenciaPorcentual,
                    updated: currentDate
                };
            });
        }
    });
}

// ESTADO INCIAL DE PUBLICIDADES

export const initialAds = {
    home: {
        portada: {
            media: {
                desktop: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                },
                mobile: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                }
            }
        },
        politica: {
            media: {
                desktop: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                },
                mobile: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                }
            }
        },
        'eco & negocios': {
            media: {
                desktop: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                },
                mobile: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                }
            }
        },
        deportes: {
            media: {
                desktop: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                },
                mobile: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                }
            }
        },
        tendencias: {
            media: {
                desktop: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                },
                mobile: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                }
            }
        },
        portalcana: {
            media: {
                desktop: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                },
                mobile: {
                    top: {
                        public_id: "",
                        url: ""
                    },
                    side: {
                        public_id: "",
                        url: ""
                    },
                    bottom: {
                        public_id: "",
                        url: ""
                    }
                }
            }
        }
    }
};

// GET NEWS BY PATH

export async function getNewsByPath(path: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news?path=${path}`);

        const { data } = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function getNewsByCategory(category: string) {
    try {
        const encodedCategory = encodeURIComponent(category);

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news?category=${encodedCategory}`);

        const { data } = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}


// GET MORE NEWS 

export async function getFormatedCategoryNews(query: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/more-news?category=${query}`, { next: { revalidate: 60 } });

        if (!response.ok) {
            console.log('Error al obtener el cover de la home');
        }
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

// Función para normalizar el título y generar un path URL amigable
export const normalizeTitle = (title: string) => {
    // Reemplazar caracteres acentuados y especiales
    const normalizedTitle = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Reemplazar espacios por guiones y convertir a minúsculas
    const path = normalizedTitle.replace(/\s+/g, '-').toLowerCase();
    // Eliminar caracteres no permitidos en URLs
    return path.replace(/[^a-z0-9\-]/g, '');
};