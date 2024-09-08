import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { request } from "http"
import { NextResponse } from "next/server"

export const PATCH = async(req: Request, {params}:{params:{storeId: string, categoryId: string}}) => {

    try {

        const profile = await getProfile()
        const {name, billboardId} = await req.json()
        const storeId = params.storeId
        const categoryId = params.categoryId

        if (!profile) {
            return new NextResponse("[UNAUTHORIZED]",{status:401})
        }
        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status:400})
        }
        if (!categoryId) {
            return new NextResponse("[CATEGORY ID NOT FOUND]",{status:400})
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
        let category = await db.category.findUnique({
            where:{
                id: categoryId,
                storeId,
             
            }
        })
        if (!category) {
            return new NextResponse("[CATEGORY NOT FOUND]",{status:404})

        }
        category = await db.category.update({
            where:{
                id: categoryId,
                storeId,
             
            },
            data:{
                name,
                billboardId
            }
        })
        return NextResponse.json(category)
        
    } catch (error) {
        
    }
}