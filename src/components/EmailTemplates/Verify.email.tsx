interface VerifyEmailTemplateProps {
    email: string;
    emailVerificationToken: string;
}

export const VerifyEmailTemplate: React.FC<Readonly<VerifyEmailTemplateProps>> = ({
    email, emailVerificationToken
}) => (
    <div>
        <h1>Verificacion de email para: {email}!</h1>
        <p>Para verificar tu correo haz click en el siguiente enlace</p>
        <a href={`http://localhost:3000/auth/verify-email?token=${emailVerificationToken}`}>Verificar Email</a>
    </div>
);
