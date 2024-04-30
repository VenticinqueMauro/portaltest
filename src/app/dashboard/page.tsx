import Image from "next/image";

export default function page() {
    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Bienvenido a TDN Admin</h1>
                <p className="text-gray-600 mt-2">Administre el portal con facilidad. <br />Acceda a poderosas herramientas e información para impulsar su éxito.</p>
            </div>
            <div className="w-full max-w-3xl">
                <Image src="/portada-dashboard.png" className="mx-auto" width={1080} height={607} alt="portada" />
            </div>
        </div>
    )
}

