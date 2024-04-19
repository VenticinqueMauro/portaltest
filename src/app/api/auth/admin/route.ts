import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/admin.user";
import { handleError } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    try {
        await connectDB();

        if (id) {
            const adminUser = await AdminUser.findById(id, '-password');

            if (!adminUser) {
                return NextResponse.json({ error: 'No se encontro el usuario' }, { status: 404 })
            }

            return NextResponse.json({ message: "Usuario administrador encontrado con éxito", data: adminUser }, { status: 200 })
        }

        const adminUsers = await AdminUser.find({}, '-password');

        if (!adminUsers || adminUsers.length === 0) {
            return NextResponse.json({ error: 'No se encontraron usuarios administradores' }, { status: 404 });
        }

        return NextResponse.json({ message: "Usuarios administradores encontrados con éxito", data: adminUsers }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
