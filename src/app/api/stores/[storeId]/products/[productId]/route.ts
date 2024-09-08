import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async(req: Request,{params}:{params:{storeId: string , productId: string}}) => {

    try {
        const storeId = params.storeId
        const productId = params.productId

       
        const product = await db.product.findUnique({
            where:{
                id: productId,
                storeId
                
               
            },
            include:{
                images: true,
                category: true,
                size: true,
                color: true
            }
        })
        return NextResponse.json(product)
        
        
    } catch (error) {
        return new NextResponse("[GETTING THE product]",{status: 500})

    }
}