import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { NextResponse } from "next/server"

export const POST = async(req: Request) => {

    try {
        const profile = await getProfile()
        const {name} = await req.json()
        if (!profile) {
            return new NextResponse('[UNAUTHORIZED]',{status:401})
        }
        if (!name) {
            return new NextResponse('[CONTENT REQUIRED]',{status:400})
        }
        const store = await db.store.create({
            data:{
                name,
                profileId: profile.id
            }
        })

        return NextResponse.json(store)
        
    } catch (error) {
        
    }
}