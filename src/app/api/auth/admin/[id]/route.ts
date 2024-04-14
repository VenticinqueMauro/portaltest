import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/admin.user";
import { handleError } from "@/utils/utils";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        await connectDB();

        const newsFound = await AdminUser.findById(id);

        if (!newsFound) {
            return NextResponse.json({ error: "No se encontró el usuario" }, { status: 404 });
        }

        await AdminUser.deleteOne({ _id: id });

        return NextResponse.json({ message: "Noticia eliminada" }, { status: 200 });

    } catch (error) {
        return handleError(error);
    }
}