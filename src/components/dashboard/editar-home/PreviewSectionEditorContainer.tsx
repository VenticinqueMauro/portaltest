import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export default function PreviewSectionEditorContainer() {
    return (
        <div className={`rounded col-span-9 max-w-7xl p-5 max-h-[630px]`}>
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 col-start-1 gap-x-4 flex items-center justify-end">
                    <Button size={'sm'}>Guardar Cambios</Button>
                </div>
                <h2 className="col-span-12 tracking-tight text-2xl font-semibold">Política</h2>
                <div className="col-span-6 flex flex-col gap-5 cursor-pointer z-20">
                    <Card className="rounded hover:border-primary hover:border-2">
                        <div>
                            <Image src='/placeholder.svg' alt="placeholder" width={400} height={300} className="w-full object-cover aspect-video " />
                        </div>
                        <CardHeader>
                            <CardDescription>
                                <span className="max-w-[150px] rounded h-[20px] mx-auto bg-gray-200 block" />
                            </CardDescription>
                            <CardTitle>
                                <span className="w-full h-[40px] rounded mx-auto bg-gray-200 block" />
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    {/* publicidadD */}
                    <div className="w-full h-[150px] bg-gray-100 cursor-not-allowed text-xs text-muted-foreground flex justify-center items-center">Publicidad</div>
                </div>

                <div className="col-span-6 gap-3 grid grid-cols-12 hover:border-primary hover:border-2 cursor-pointer">
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index} className="rounded col-span-6">
                                <div>
                                    <Image src='/placeholder.svg' alt="placeholder" width={400} height={300} className="w-full object-cover aspect-video " />
                                </div>
                                <CardHeader>
                                    <CardDescription>
                                        <span className="max-w-[150px] rounded h-[15px] mx-auto bg-gray-200 block" />
                                    </CardDescription>
                                    <CardTitle>
                                        <span className="w-full rounded h-[50px] mx-auto bg-gray-200 block" />
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
