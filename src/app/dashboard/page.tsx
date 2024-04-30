import Image from "next/image";

export default function page() {
    return (
        <div>
            <h1 className='text-2xl font-bold'>Bienvenido a TDN Admin</h1>
            <p className='text-muted-foreground mt-3'>Administre el portal con facilidad. <br />Acceda a poderosas herramientas e información para impulsar su éxito.</p>
            <Image src='/portada-dashboard.png' className="mx-auto" width={600} height={600} alt="portada" />
        </div>
    )
}

