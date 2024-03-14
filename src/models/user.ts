import { Schema, model, models, Document } from "mongoose";

enum UserRole {
    EDITOR = 'editor',
    WRITER = 'redactor',
    PUBLICIST = 'publicista',
    CHIEF_WRITER = 'redactor en jefe',
    ADMIN = 'admin',
}

interface UserDocument extends Document {
    email: string;
    password: string;
    fullname: string;
    role: UserRole;
}

const userSchema = new Schema<UserDocument>({
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

export const User = models.User || model<UserDocument>('User', userSchema);
