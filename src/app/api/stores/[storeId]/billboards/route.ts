import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async(req: Request,{params}: {params: {storeId: string}}) => {

    try {
        const storeId = params.storeId
        if (!storeId) {
            return new NextResponse('[STORE ID NOT FOUND]',{status: 400})
        }
        const billboars = await db.billboard.findMany({
            where:{
                storeId: storeId
            }
        })
        return NextResponse.json(billboars)
        
    } catch (error) {
        
    }
}