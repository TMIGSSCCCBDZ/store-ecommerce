import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async(req: Request,{params}:{params:{storeId: string}}) => {

    try {
        const storeId = params.storeId
        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status: 400})
        }

        const colors = await db.color.findMany({
            where:{
                storeId
            }
        })
        return NextResponse.json(colors)
        
        
    } catch (error) {
        return new NextResponse("[GETTING THE SIZES]",{status: 500})

    }
}