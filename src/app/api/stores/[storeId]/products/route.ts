import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async(req: Request,{params}:{params:{storeId: string}}) => {

    try {
        const storeId = params.storeId
        const {searchParams} = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined
        const sizeId = searchParams.get('sizeId') || undefined
        const colorId = searchParams.get('colorId') || undefined
        const isFeatured = searchParams.get('isFeatured') 


        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status: 400})
        }
   
        const products = await db.product.findMany({
            where:{
                storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include:{
                images: true,
                category: true,
                size: true,
                color: true
            }
        })
        return NextResponse.json(products)
        
        
    } catch (error) {
        return new NextResponse("[GETTING THE SIZES]",{status: 500})

    }
}