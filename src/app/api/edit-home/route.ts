import { connectDB } from "@/lib/mongodb";
import { HomePage } from "@/models/home";
import { SidebarItem } from "@/types/news.types";
import { handleError } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        // Conectarse a la base de datos
        await connectDB();

        // Obtener los datos de la solicitud
        const data = await request.json();

        // Validar los datos recibidos (puedes implementar tu propia lógica de validación aquí)

        // Buscar el documento HomePage existente en la base de datos
        let home = await HomePage.findOne();

        // Si no se encontró el documento, crear uno nuevo
        if (!home) {
            // Crear un nuevo documento HomePage con los datos recibidos
            home = new HomePage({
                cover: {
                    mainNews: {
                        _id: data.cover.mainNews._id,
                        media: {
                            publicId: data.cover.mainNews.media.publicId,
                            url: data.cover.mainNews.media.url,
                            type: data.cover.mainNews.media.type
                        },
                        pretitle: data.cover.mainNews.pretitle,
                        title: data.cover.mainNews.title,
                        summary: data.cover.mainNews.summary
                    },
                    leftSidebar: data.cover.leftSidebar.map((item: SidebarItem) => ({
                        _id: item.id,
                        media: {
                            publicId: item.media.publicId,
                            url: item.media.url,
                            type: item.media.type
                        },
                        pretitle: item.pretitle,
                        title: item.title,
                        summary: item.summary
                    })),
                    rightSidebar: data.cover.rightSidebar.map((item: SidebarItem) => ({
                        _id: item.id,
                        media: {
                            publicId: item.media.publicId,
                            url: item.media.url,
                            type: item.media.type
                        },
                        pretitle: item.pretitle,
                        title: item.title,
                        summary: item.summary
                    }))
                }
            });

            // Guardar el nuevo documento en la base de datos
            home = await home.save();
        } else {
            // Si se encontró un documento existente, actualizarlo con los datos recibidos
            home.cover = {
                mainNews: {
                    _id: data.cover.mainNews._id,
                    media: {
                        publicId: data.cover.mainNews.media.publicId,
                        url: data.cover.mainNews.media.url,
                        type: data.cover.mainNews.media.type
                    },
                    pretitle: data.cover.mainNews.pretitle,
                    title: data.cover.mainNews.title,
                    summary: data.cover.mainNews.summary
                },
                leftSidebar: data.cover.leftSidebar.map((item: SidebarItem) => ({
                    _id: item.id,
                    media: {
                        publicId: item.media.publicId,
                        url: item.media.url,
                        type: item.media.type
                    },
                    pretitle: item.pretitle,
                    title: item.title,
                    summary: item.summary
                })),
                rightSidebar: data.cover.rightSidebar.map((item: SidebarItem) => ({
                    _id: item.id,
                    media: {
                        publicId: item.media.publicId,
                        url: item.media.url,
                        type: item.media.type
                    },
                    pretitle: item.pretitle,
                    title: item.title,
                    summary: item.summary
                }))
            };

            // Guardar el documento actualizado en la base de datos
            home = await home.save();
        }

        // Devolver una respuesta con el documento actualizado
        return NextResponse.json({ message: 'Home editado con éxito', data: home });

    } catch (error) {
        // Manejar errores
        return handleError(error);
    }
}
