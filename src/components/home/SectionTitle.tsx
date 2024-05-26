
interface Props {
    title: string;
}

export default function SectionTitle({ title }: Props) {

    if (!title) {
        return null
    }

    return (
        <div className="max-w-6xl 2xl:mx-auto px-3">
            <span className="italic tracking-tight text-2xl text-tdn relative inline-block">
                <h2 className="pt-2 border-t border-tdn w-[200px] mb-5 relative">
                    {title}
                    <span className="w-[40px] h-1 bg-tdn block absolute top-0 left-0"></span>
                </h2>
            </span>
        </div>

    )
}
