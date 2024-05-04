import { connectDB } from "@/lib/mongodb";
import { HomePage } from "@/models/home";
import { SidebarItem } from "@/types/news.types";
import { handleError } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        await connectDB();

        const data = await request.json();

        const home = new HomePage({
            cover: {
                mainNews: {
                    _id: data.cover.mainNews._id,
                    media: {
                        publicId: data.cover.mainNews.media.publicId,
                        url: data.cover.mainNews.media.url,
                        type: data.cover.mainNews.media.type
                    },
                    pretitle: data.cover.mainNews.pretitle,
                    title: data.cover.mainNews.title,
                    summary: data.cover.mainNews.summary
                },
                leftSidebar: data.cover.leftSidebar.map((item: SidebarItem) => ({
                    _id: item.id,
                    media: {
                        publicId: item.media.publicId,
                        url: item.media.url,
                        type: item.media.type
                    },
                    pretitle: item.pretitle,
                    title: item.title,
                    summary: item.summary
                })),
                rightSidebar: data.cover.rightSidebar.map((item: SidebarItem) => ({
                    _id: item.id,
                    media: {
                        publicId: item.media.publicId,
                        url: item.media.url,
                        type: item.media.type
                    },
                    pretitle: item.pretitle,
                    title: item.title,
                    summary: item.summary
                }))
            }
        });

        const respuesta = await home.save();

        return NextResponse.json({ message: 'exito', data: respuesta })

    } catch (error) {
        return handleError(error)
    }
}
