import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/admin.user";
import { handleError } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const adminUsers = await AdminUser.find({}, '-password');

        if (!adminUsers || adminUsers.length === 0) {
            return NextResponse.json({ error: 'No se encontraron usuarios administradores' }, { status: 404 });
        }

        return NextResponse.json({ message: "Usuarios administradores encontrados con éxito", data: adminUsers }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
