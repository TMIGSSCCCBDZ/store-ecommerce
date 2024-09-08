import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { request } from "http"
import { NextResponse } from "next/server"

export const DELETE = async(req: Request, {params}:{params:{storeId: string, categoryId: string}}) => {

    try {

        const profile = await getProfile()

        const storeId = params.storeId
        const categoryId = params.categoryId
        const {searchParams} = new URL(req.url)
        const billboardId = searchParams.get('billboardId') as string
      

        if (!profile) {
            return new NextResponse("[UNAUTHORIZED]",{status:401})
        }
        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status:400})
        }
        if (!categoryId) {
            return new NextResponse("[CATEGORY ID NOT FOUND]",{status:400})
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
                billboardId
             
            }
        })
        if (!category) {
            return new NextResponse("[CATEGORY NOT FOUND]",{status:404})

        }
        category = await db.category.delete({
            where:{
                id: categoryId,
                storeId,
                billboardId
             
            }
        })
        return NextResponse.json(category)
        
    } catch (error) {
        
    }
}