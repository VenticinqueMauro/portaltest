import { connectDB } from '@/lib/mongodb';
import { ClientUser } from '@/models/client.user';
import ChangePasswordForm from './components/ChangePasswordForm';
import ErrorMessage from './components/ErrorMessage';

interface ResetPasswordPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
    if (searchParams.token) {

        await connectDB();
        const user = await ClientUser.findOne({ resetPasswordToken: searchParams.token as string });
        if (!user) {
            return <ErrorMessage />;
        }

        return <ChangePasswordForm token={searchParams.token} />;
    } else {
        return <p>FORMULARIO RESET PASSWORD</p>;
    }
};

export default ResetPasswordPage;