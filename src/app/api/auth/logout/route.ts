import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        cookies().delete('portal_app')

        return NextResponse.json({ message: 'Logout successfully' }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: error.message
            }, {
                status: 400
            })
        }
    }
}