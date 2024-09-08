import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { NextResponse } from "next/server"

export const DELETE = async(req: Request,{params}:{params:{storeId: string, colorId: string}}) => {

    try {
        const profile =  await getProfile()
        const storeId = params.storeId
        const colorId = params.colorId

        
        if (!profile) {
            return new NextResponse('[UNAUTHORIZED]',{status: 401})
        }
        if (!storeId) {
            return new NextResponse('[STORE ID NOT FOUND]',{status: 400})
        }
        if (!colorId) {
            return new NextResponse('[COLOR ID NOT FOUND]',{status: 400})
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
let color = await db.color.findUnique({
    where:{
        id: colorId,
        storeId: storeId
    }
})
if (!color) {
    return new NextResponse('[COLOR NOT FOUND]',{status: 404})

}
         color = await db.color.delete({
            where:{
                id: colorId,
                storeId

            }
        })
        return NextResponse.json(color)

    } catch (error) {
        return new NextResponse('[DELETING COLOR]',{status: 500})

    }
}