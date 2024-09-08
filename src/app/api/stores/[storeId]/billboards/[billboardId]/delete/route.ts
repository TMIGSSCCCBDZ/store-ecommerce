import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { NextResponse } from "next/server"





export const PATCH = async(req: Request,{params}: {params: {storeId: string, billboardId: string}}) => {

    try {
        const profile = await getProfile()
        const storeId = params.storeId
        const billboardId = params.billboardId

        if (!profile) {
            return new NextResponse('[UNAUTHORIZED]',{status: 401})

        }
        if (!storeId) {
            return new NextResponse('[STORE ID NOT FOUND]',{status: 400})

        }
        if (!billboardId) {
            return new NextResponse('[BILLBOARD ID NOT FOUND]',{status: 400})

        }
      
     
        const store = await db.store.findUnique({
            where:{
                id: storeId,
                profileId: profile.id
            }
            
        })

        if (!store) {
            return new NextResponse('[STORE NOT FOUND]',{status: 404})

        }
        let billboard = await db.billboard.findUnique({
            where:{
                id: billboardId,
                storeId: storeId
            }
        })
        if (!billboard) {
            return new NextResponse('[BILLBOARD NOT FOUND]',{status: 404})

        }
        await db.billboard.delete({
            where:{
                id: billboardId,
                storeId: storeId
            }
         })
          NextResponse.json(billboard)
    } catch (error) {
        return new NextResponse('[DELETING BILLBOARD]',{status: 500})

    }
}