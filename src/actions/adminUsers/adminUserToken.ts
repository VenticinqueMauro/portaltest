'use server';

import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function handleDecodeAdminUserToken() {
    const token = cookies().get("portal_app")?.value;
    if (!token) {
        return { error: 'No autorizado' };
    }
    const decodedToken: any = verify(token, `${process.env.JWT_KEY}`);
    return decodedToken;
}