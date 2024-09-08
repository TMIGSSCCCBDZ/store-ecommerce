import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async(req: Request, {params}:{params:{storeId: string, categoryId: string}}) => {

    try {

       
        const storeId = params.storeId
        const categoryId = params.categoryId

    
        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status:400})
        }
          
        if (!categoryId) {
            return new NextResponse("[CATEGORY ID NOT FOUND]",{status:400})
        }
        const categorie = await db.category.findUnique({
            where:{
                id: categoryId,
                storeId
            },include:{
                billboard: true
            }
        })
        return NextResponse.json(categorie)
     
        
    } catch (error) {
        
    }
}