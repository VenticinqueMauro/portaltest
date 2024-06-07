interface ResetPasswordEmailTemplateProps {
    email: string;
    resetPasswordToken: string;
}

export const ResetPasswordEmailTemplate: React.FC<Readonly<ResetPasswordEmailTemplateProps>> = ({ email, resetPasswordToken }) => (
    <div className="max-w-xl mx-auto p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h1 className="text-xl font-bold text-gray-800 text-center mb-4">Restablecer contraseña para <b>{email}</b></h1>
        <p className="text-gray-600 text-lg text-center mb-6">
            Para restablecer tu contraseña, haz clic en este enlace y sigue las instrucciones:
        </p>
        <div className="text-center mb-6">
            <a
                href={`${process.env.NEXT_PUBLIC_URL}auth/reset-password?token=${resetPasswordToken}`}
                className="inline-block px-6 py-3 bg-[#423B8B] text-white text-xl font-semibold rounded-md hover:opacity-90 transition duration-300">
                Verificar Email
            </a>
        </div>
        <br />
        <p className="text-gray-500 text-sm text-center">
            Si no solicitaste este restablecimiento de contraseña, por favor ignora este mensaje.
        </p>
    </div>
);
