import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { NextResponse } from "next/server"





export const GET = async(req: Request,{params}: {params: {storeId: string, billboardId: string}}) => {

    try {
        
        const storeId = params.storeId
        const billboardId = params.billboardId

     
        if (!storeId) {
            return new NextResponse('[STORE ID NOT FOUND]',{status: 400})

        }
        if (!billboardId) {
            return new NextResponse('[BILLBOARD ID NOT FOUND]',{status: 400})

        }
   
        const store = await db.store.findUnique({
            where:{
                id: storeId,
            
            }
        })

        if (!store) {
            return new NextResponse('[STORE NOT FOUND]',{status: 404})

        }
        const billboard = await db.billboard.findUnique({
            where:{
                id: billboardId,
                storeId: storeId
            }
        })
        if (!billboard) {
            return new NextResponse('[BILLBOARD NOT FOUND]',{status: 404})

        }
      
        return NextResponse.json(billboard)
    } catch (error) {
        
    }
}