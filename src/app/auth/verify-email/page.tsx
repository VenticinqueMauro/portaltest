
interface VerifyEmailProps {
    searchParams: { [key: string]: string | string[] | undefined };
}


export default async function page({ searchParams }: VerifyEmailProps) {

    if (searchParams.token) {
        const res = await fetch(`http://localhost:3000/api/auth/user/verify-email?token=${searchParams.token}`, {
            cache: 'no-store',
        })

        if (res.status === 404) {
            // CREAR COMPONENTE PARA TOKEN INVALIDO CON REDIRECCION NECESARIA 
            return <div>Invalid token</div>;
        }

        console.log(await res.json())
        
        // CREAR COMPONENTE Y REDIRECCIONAR A PAGINA DE INICIO
        return <div>Email verified successfully 👌</div>;
    } else {
        // CREAR COMPONENTE PARA TOKEN NO PROPORCIONADO CON REDIRECCION
        return <div>No token provided 😶‍🌫️</div>;
    }
}
