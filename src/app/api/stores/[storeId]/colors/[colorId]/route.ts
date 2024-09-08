import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async(req: Request,{params}:{params:{storeId: string , colorId: string}}) => {

    try {
        const storeId = params.storeId
        const colorId = params.colorId

        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status: 400})
        }
        if (!colorId) {
            return new NextResponse("[COLOR ID NOT FOUND]",{status: 400})
        }

        const color = await db.color.findUnique({
            where:{
                id: colorId,
                storeId: storeId
            }
        })
        return NextResponse.json(color)
        
        
    } catch (error) {
        return new NextResponse("[GETTING THE SIZE]",{status: 500})

    }
}