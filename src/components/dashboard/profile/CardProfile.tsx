'use client';

import { handleUserAdminProfile } from "@/actions/adminUsers/HandleUserAdminProfile";
import SubmitButton from "@/components/dashboard/form-news/SubmitButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    user: {
        _id: string;
        email: string;
        fullname: string;
        role: string;
        avatar: {
            publicId: string | undefined;
            url: string | undefined;
        }
    }
}



export default function CardProfile({ user }: Props) {

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfile = async (formData: FormData) => {

        formData.append('id', user._id);
        formData.append('publicId', user?.avatar?.publicId as string);
        formData.append('oldFullname', user.fullname);
        formData.append('role', user.role);
        formData.append('oldEmail', user.email);

        const response = await handleUserAdminProfile(formData);

        if (response.error) {
            toast.error(response.error)
        } else if (response.message) {
            toast.success(response.message)
            setAvatarPreview(null);
        } else {
            toast.warning(response)
        }
    }

    return (
        <Card className="max-w-xl mx-auto rounded h-fit my-10 relative">
            <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Información de administrador</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" >
                <form action={handleProfile} className="flex items-center space-x-6">
                    <div className="flex-shrink-0 w-12">
                        <Label htmlFor="avatar" >
                            <Avatar className="cursor-pointer w-16 h-16 shadow relative group">
                                {avatarPreview ? (
                                    <AvatarImage src={avatarPreview} className="aspect-square object-contain" />
                                ) : (
                                    <AvatarImage src={user.avatar?.url} />
                                )}
                                <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-200 absolute w-16 h-16 top-0 left-0 bg-black/10 backdrop-blur-[1px]  flex justify-center items-center text-white/60">
                                    <ImageUp />
                                </span>
                                <AvatarFallback>TDN</AvatarFallback>
                            </Avatar>
                        </Label>
                        <Input id="avatar" name="avatar" type='file' className="hidden" onChange={handleAvatarChange} />
                        <SubmitButton title='Guardar cambios' style={'absolute top-0 right-0 rounded m-2 w-fit'} />
                    </div>
                    <div>
                        <Input name="fullname" className="text-2xl font-bold border-none shadow-none" placeholder={user.fullname}></Input>
                        <Input name="email" className="text-sm border-none shadow-none " placeholder={user.email}></Input>
                    </div>
                </form>
                <div className="border-t border-gray-200 dark:border-gray-800" />
                <div className="grid gap-1.5 md:grid-cols-2">
                    {/* <div>
                        <h3 className="text-sm font-bold">Permisos</h3>
                        <ul className="pt-2 list-disc text-sm grid text-gray-500 dark:text-gray-400">
                            <li>Create user accounts</li>
                            <li>Manage documents</li>
                            <li>Access analytics dashboard</li>
                        </ul>
                    </div> */}
                    <div>
                        <h3 className="text-sm font-bold">Rol</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
