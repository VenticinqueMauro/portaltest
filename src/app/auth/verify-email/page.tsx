import ErrorMessage from "./components/ErrorMessage";
import SuccessMessage from "./components/SuccessMessage";

interface VerifyEmailProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function page({ searchParams }: VerifyEmailProps) {

    if (searchParams.token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/user/verify-email?token=${searchParams.token}`, {
            cache: 'no-store',
        })

        if (res.status === 404) {
            return <ErrorMessage />;
        }

        return <SuccessMessage />;
    } else {
        return <ErrorMessage />;
    }
}
