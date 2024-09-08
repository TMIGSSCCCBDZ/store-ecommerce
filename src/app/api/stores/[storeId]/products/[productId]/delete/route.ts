import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { NextResponse } from "next/server"

export const DELETE = async(req: Request,{params}:{params:{storeId: string, productId: string}}) => {

    try {
        const profile =  await getProfile()
        const storeId = params.storeId
        const productId = params.productId

   
        if (!profile) {
            return new NextResponse('[UNAUTHORIZED]',{status: 401})
        }
        if (!storeId) {
            return new NextResponse('[STORE ID NOT FOUND]',{status: 400})
        }
        if (!productId) {
            return new NextResponse('[PRODUCT ID NOT FOUND]',{status: 400})
        }
   
      
        const store = await db.store.findUnique({
            where: {
                id: storeId,
                profileId: profile.id
            }
        })
        if (!store) {
            return new NextResponse('[STORE NOT FOUND]',{status: 404})
        }
    
        let product = await db.product.delete({
            where:{
                id: productId,
                storeId
            }
         
        })
     
        return NextResponse.json(product)
    } catch (error) {
        return new NextResponse('[CREATING SIZE]',{status: 500})

    }
}