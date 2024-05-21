import Image from "next/image";

interface Props {
    url: string;
}

export default function InferiorDesktop({ url }: Props) {

    if (!url) {
        return null;
    }

    return (
        <div className="col-start-1 col-span-8">
            <div
                className="flex justify-center bg-publicidad items-center w-full h-[170px] "
            >
                <Image
                    src={url}
                    alt={`publicidad lateral`}
                    width={480}
                    height={150}
                />
            </div>
        </div>
    )
}
