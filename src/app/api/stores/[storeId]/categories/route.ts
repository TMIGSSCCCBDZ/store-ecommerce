import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async(req: Request, {params}:{params:{storeId: string}}) => {

    try {

       
        const storeId = params.storeId
    
        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status:400})
        }
        const categories = await db.category.findMany({
            where:{
                storeId
            },include:{
                billboard: true
            }
            
        })
        return NextResponse.json(categories)
     
        
    } catch (error) {
        
    }
}