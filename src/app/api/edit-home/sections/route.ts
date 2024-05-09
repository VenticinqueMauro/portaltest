import { connectDB } from "@/lib/mongodb";
import { HomePage } from "@/models/home";
import { handleError } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(request: NextRequest) {
    try {
        // Conectarse a la base de datos
        await connectDB();

        // Obtener los datos de la solicitud
        const data = await request.json();

        const sectionMessage = Object.keys(data.sections)[0] === 'politica' ? 'política' : Object.keys(data.sections)[0] === 'eco & negocios' ? 'economía' : Object.keys(data.sections)[0] === 'portalcana' ? 'porta de la caña' : Object.keys(data.sections)[0]

        // Validar los datos recibidos (puedes implementar tu propia lógica de validación aquí)

        // Buscar el documento HomePage existente en la base de datos
        let home = await HomePage.findOne();

        // Si no se encontró el documento, crear uno nuevo
        if (!home) {
            // Crear un nuevo documento HomePage con los datos recibidos
            home = new HomePage({
                sections: data.sections
            });

            // Guardar el nuevo documento en la base de datos
            home = await home.save();
        } else {
            // Si se encontró un documento existente, actualizarlo con los datos recibidos
            home.sections = data.sections;

            // Guardar el documento actualizado en la base de datos
            home = await home.save();
        }

        // Devolver una respuesta con el documento actualizado
        return NextResponse.json({ message: `Sección ${sectionMessage} editada con éxito`, data: home });

    } catch (error) {
        // Manejar errores
        return handleError(error);
    }
}

