import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { request } from "http"
import { NextResponse } from "next/server"

export const POST = async(req: Request, {params}:{params:{storeId: string}}) => {

    try {

        const profile = await getProfile()
        const {name, billboardId} = await req.json()
        const storeId = params.storeId
        if (!profile) {
            return new NextResponse("[UNAUTHORIZED]",{status:401})
        }
        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status:400})
        }
        if (!name) {
            return new NextResponse("[NAME NOT PROVIDED]",{status:400})
        }
        if (!billboardId) {
            return new NextResponse("[BILLBOARD ID NOT PROVIDED]",{status:400})
        }

        const store = await db.store.findUnique({
            where:{
                id: storeId,
                profileId: profile.id
            }
        })
        if (!store) {
            return new NextResponse("[STORE NOT FOUND]",{status:404})
        }
        const billboard = await db.billboard.findUnique({
            where:{
                id: billboardId,
                storeId: storeId
            }
        })
        if (!billboard) {
            return new NextResponse("[BILLBOARD NOT FOUND]",{status:404})
        }
        const category = await db.category.create({
            data:{
                name,
                billboardId,
                storeId
            }
        })
        return NextResponse.json(category)
        
    } catch (error) {
        
    }
}