import { Schema, model, models, Document } from "mongoose";


interface ClientUserDocument extends Document {
    email: string;
    password: string;
    fullname: string;
    subscribed: boolean;
    emailVerified: boolean;
    emailVerificationToken: string;
    resetPasswordToken: string;
    resetPasswordTokenExpiry: Date;
}

const ClientUserSchema = new Schema<ClientUserDocument>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
        minlength: 3
    },
    subscribed: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String,
        default: null,
        unique: true
    },
    resetPasswordToken: {
        type: String,
        default: null,
        unique: true
    },
    resetPasswordTokenExpiry: {
        type: Date,
        default: null
    }
});

export const ClientUser = models.ClientUser || model<ClientUserDocument>('ClientUser', ClientUserSchema);
