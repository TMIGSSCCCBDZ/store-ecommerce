import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { NextResponse } from "next/server"





export const POST = async(req: Request,{params}: {params: {storeId: string}}) => {

    try {
        const profile = await getProfile()
        const storeId = params.storeId
        console.log(storeId)
        if (!profile) {
            return new NextResponse('[UNAUTHORIZED]',{status: 401})

        }
        if (!storeId) {
            return new NextResponse('[STORE ID NOT FOUND]',{status: 400})

        }
        const {name, imageUrl} = await req.json()
        if (!name) {
            return new NextResponse('[NAME NOT PROVIDED]',{status: 400})

        }
        if (!imageUrl) {
            return new NextResponse('[IMAGEURL NOT PROVIDED]',{status: 400})

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
        const billboard = await db.billboard.create({
            data:{
        label: name, 
        imageUrl, 
        storeId
            }
        })
        return NextResponse.json(billboard)
    } catch (error) {
        
    }
}