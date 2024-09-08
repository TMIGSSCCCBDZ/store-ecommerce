import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async(req: Request,{params}:{params:{storeId: string , sizeId: string}}) => {

    try {
        const storeId = params.storeId
        const sizeId = params.sizeId

        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status: 400})
        }
        if (!sizeId) {
            return new NextResponse("[SIZE ID NOT FOUND]",{status: 400})
        }

        const size = await db.size.findUnique({
            where:{
                id: sizeId,
                storeId: storeId
            }
        })
        return NextResponse.json(size)
        
        
    } catch (error) {
        return new NextResponse("[GETTING THE SIZE]",{status: 500})

    }
}