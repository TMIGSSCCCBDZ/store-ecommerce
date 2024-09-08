import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { NextResponse } from "next/server"

export const PATCH = async(req: Request, {params}:{params:{storeId: string}}) => {

    try {
        console.log(params.storeId)
        const profile = await getProfile()
        const storeId = params.storeId
        const {name} = await req.json()
        if (!profile) {
            return new NextResponse("[UNAUTHORIZED]",{status:401})
        }
        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status:400})
        }
        if (!name) {
            return new NextResponse("[NAME IS MISSING]",{status:400})
        }
        const store = await db.store.update({
            where:{
                id: storeId,
                profileId: profile.id
            },
            data:{
                name
            }
        })

        return NextResponse.json(store)
        
    } catch (error) {
        return new NextResponse("[EDITING AND DELETING THE STORE]",{status:500})

    }
}

export const DELETE = async(req: Request, {params}:{params:{storeId: string}}) => {

    try {
        const profile = await getProfile()
        const storeId = params.storeId
      
        if (!profile) {
            return new NextResponse("[UNAUTHORIZED]",{status:401})
        }
        if (!storeId) {
            return new NextResponse("[STORE ID NOT FOUND]",{status:400})
        }
      
        const store = await db.store.deleteMany({
            where:{
                id: storeId,
                profileId: profile.id
            }
          
        })

        return NextResponse.json(store)
        
    } catch (error) {
        return new NextResponse("[EDITING AND DELETING THE STORE]",{status:500})

    }
}