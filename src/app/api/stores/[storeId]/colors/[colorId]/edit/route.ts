import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { NextResponse } from "next/server"

export const PATCH = async(req: Request,{params}:{params:{storeId: string, colorId: string}}) => {

    try {
        const profile =  await getProfile()
        const storeId = params.storeId
        const colorId = params.colorId

        const {name, value}  = await req.json()
        if (!profile) {
            return new NextResponse('[UNAUTHORIZED]',{status: 401})
        }
        if (!storeId) {
            return new NextResponse('[STORE ID NOT FOUND]',{status: 400})
        }
        if (!colorId) {
            return new NextResponse('[COLOR ID NOT FOUND]',{status: 400})
        }
        if (!name) {
            return new NextResponse('[NAME NOT FOUND]',{status: 400})
        }
        if (!value) {
            return new NextResponse('[VALUE  NOT FOUND]',{status: 400})
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
    return new NextResponse('[SIZE NOT FOUND]',{status: 404})

}
         color = await db.size.update({
            where:{
                id: colorId,
                storeId

            },
            data:{
                name,
                value
                
            }
        })
        return NextResponse.json(color)
    } catch (error) {
        return new NextResponse('[CREATING SIZE]',{status: 500})

    }
}