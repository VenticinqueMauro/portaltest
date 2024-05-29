import { connectDB } from "@/lib/mongodb";
import { Ad } from "@/models/ads";
import { handleError } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('category');

    try {
        // Conectar a la base de datos
        await connectDB();

        // Buscar el documento de anuncios en la base de datos
        const adsDocument = await Ad.findOne({});

        if (!adsDocument) {
            // Si no se encuentra el documento, devolver un mensaje de error
            return NextResponse.json({ error: "No se encontraron anuncios" });
        }

        // Si se proporciona una categoría, filtrar los anuncios por esa categoría
        let filteredAds;
        if (query) {
            filteredAds = adsDocument.ads.home[query];
            if (!filteredAds) {
                // Si no se encuentra la categoría especificada, devolver un mensaje de error
                return NextResponse.json({ error: `No se encontraron anuncios para la categoría: ${query}` });
            }
        } else {
            // Si no se proporciona una categoría, devolver todos los anuncios
            filteredAds = adsDocument;
        }

        // Devolver el documento de anuncios encontrado
        return NextResponse.json({ message: "Anuncios obtenidos correctamente", data: filteredAds });

    } catch (error) {
        return handleError(error);
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Obtener los datos de la solicitud
        const data = await request.json();

        // Conectar a la base de datos
        await connectDB();

        // Buscar el documento de anuncios actual en la base de datos o crear uno nuevo si no existe
        let adsDocument = await Ad.findOne({});
        if (!adsDocument) {
            adsDocument = new Ad({ ads: { home: {} } });
        }

        // Actualizar el documento con los datos recibidos
        if (data.ads && data.ads.home) {
            const { home: updatedAds } = data.ads;
            for (const category of Object.keys(updatedAds)) {
                if (adsDocument.ads.home[category]) {
                    // Conservar los datos existentes y actualizar solo los campos proporcionados
                    for (const device of Object.keys(updatedAds[category].media)) {
                        for (const position of Object.keys(updatedAds[category].media[device])) {
                            // Actualizar solo si se proporciona un nuevo valor
                            if (updatedAds[category].media[device][position].public_id) {
                                adsDocument.ads.home[category].media[device][position] =
                                    updatedAds[category].media[device][position];
                            }
                        }
                    }
                } else {
                    adsDocument.ads.home[category] = updatedAds[category];
                }
            }
        }

        // Guardar el documento actualizado en la base de datos
        await adsDocument.save();

        // Devolver una respuesta con el documento actualizado
        return NextResponse.json("Anuncios actualizados correctamente");
    } catch (error) {
        // Manejar errores
        return handleError(error);
    }
}




