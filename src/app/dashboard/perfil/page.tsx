import { decodeToken, handleError } from "@/utils/utils";
import CardProfile from "../../../components/dashboard/profile/CardProfile";

export async function getProfile(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/admin?id=${id}`)

        return await response.json()
    } catch (error) {
        return handleError(error)
    }
}

export default async function page() {

    const { id } = decodeToken()

    const { data: user } = await getProfile(id)


    return (
        <CardProfile user={user} />
    )
}
