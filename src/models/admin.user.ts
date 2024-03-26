import { Schema, model, models, Document } from "mongoose";

export enum UserRole {
    EDITOR = 'editor',
    WRITER = 'redactor',
    PUBLICIST = 'publicista',
    CHIEF_WRITER = 'redactor en jefe',
    ADMIN = 'admin',
}

interface AdminUserDocument extends Document {
    email: string;
    password: string;
    fullname: string;
    role: UserRole;
}

const AdminUserSchema = new Schema<AdminUserDocument>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullname: {
        type: String,
        required: true,
        minlength: 3
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.WRITER
    }
});

export const AdminUser = models.AdminUser || model<AdminUserDocument>('AdminUser', AdminUserSchema);
