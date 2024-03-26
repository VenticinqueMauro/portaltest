interface ResetPasswordEmailTemplateProps {
    email: string;
    resetPasswordToken: string;
}

export const ResetPasswordEmailTemplate: React.FC<Readonly<ResetPasswordEmailTemplateProps>> = ({ email, resetPasswordToken }) => (
    <div>
        <h1>Restablecer contraseña para <b>{email}</b></h1>
        <p>
            Para restablecer tu contraseña, haz clic en este enlace y sigue las instrucciones:
        </p>
        <a href={`http://localhost:3000/auth/reset-password?token=${resetPasswordToken}`}>
            Haz clic aquí para restablecer la contraseña
        </a>
    </div>
);
