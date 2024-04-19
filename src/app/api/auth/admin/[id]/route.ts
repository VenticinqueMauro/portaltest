import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/admin.user";
import { handleError } from "@/utils/utils";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        await connectDB();

        const userFound = await AdminUser.findById(id);

        if (!userFound) {
            return NextResponse.json({ error: "No se encontró el usuario" }, { status: 404 });
        }

        await AdminUser.deleteOne({ _id: id });

        return NextResponse.json({ message: "Usuario eliminado" }, { status: 200 });

    } catch (error) {
        return handleError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        await connectDB();

        const { fullname, email, avatar } = await request.json();

        if (email && !email.endsWith('@tdn.com')) {
            return NextResponse.json({ error: 'El correo electrónico debe terminar con @tdn.com' }, { status: 400 });
        }

        const userFound = await AdminUser.findByIdAndUpdate(id, { fullname, email, avatar });

        if (!userFound) {
            return NextResponse.json({ error: 'No se encontró el usuario' }, { status: 404 });
        }

        return NextResponse.json({ message: "Usuario actualizado con éxito", data: userFound }, { status: 200 });
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el proceso
        console.error('Error al actualizar el usuario:', error);
        return NextResponse.json({ error: 'Error al actualizar el usuario' }, { status: 500 });
    }
}