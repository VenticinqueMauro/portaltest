import Image from "next/image";

interface Props {
    url: string;
}

export default function LateralDesktop({ url }: Props) {

    if (!url) {
        return null;
    }

    return (
        <div className="absolute  top-0 right-0  h-full ">
            <div
                className="flex justify-center  bg-publicidad  items-center p-5 sticky top-0 right-0"
            >
                <Image
                    src={url}
                    alt={`publicidad lateral`}
                    width={200}
                    height={500}
                />
            </div>
        </div>
    )
}
