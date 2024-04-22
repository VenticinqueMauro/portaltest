import { UserRole } from "@/types/news.types";
import { Schema, model, models, Document } from "mongoose";


interface UserAvatar {
    publicId: string,
    url: string
}

interface AdminUserDocument extends Document {
    email: string;
    password: string;
    fullname: string;
    role: UserRole;
    avatar: UserAvatar
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
    },
    avatar: {
        publicId: {
            type: String
        },
        url: {
            type: String
        }
    }
});

export const AdminUser = models.AdminUser || model<AdminUserDocument>('AdminUser', AdminUserSchema);
