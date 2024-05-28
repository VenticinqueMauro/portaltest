import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Props {
    category: string;
}

export default function BreadCrumb({ category }: Props) {

    const formatedCategory = category === 'politica' ? 'Política' : category

    return (
        <Breadcrumb className="w-fit -ml-6 mb-2">
            <BreadcrumbList className="list-none">
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">TENDENCIA DE NOTICIAS</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="min-w-fit">
                    <BreadcrumbLink asChild>
                        <Link className="capitalize" href={`/${category}`}>{formatedCategory}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
