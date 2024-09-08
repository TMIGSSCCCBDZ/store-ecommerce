import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { NextResponse } from "next/server"

export const PATCH = async(req: Request,{params}:{params:{storeId: string, sizeId: string}}) => {

    try {
        const profile =  await getProfile()
        const storeId = params.storeId
        const sizeId = params.sizeId

        const {name, value}  = await req.json()
        if (!profile) {
            return new NextResponse('[UNAUTHORIZED]',{status: 401})
        }
        if (!storeId) {
            return new NextResponse('[STORE ID NOT FOUND]',{status: 400})
        }
        if (!sizeId) {
            return new NextResponse('[SIZEID ID NOT FOUND]',{status: 400})
        }
        if (!name) {
            return new NextResponse('[NAME NOT FOUND]',{status: 400})
        }
        if (!value) {
            return new NextResponse('[VALUE  NOT FOUND]',{status: 400})
        }
        if (value !== 'lg' && value !== 'xl' && value !== 'xxl' && value !== 'xxxl' && value !== 'md' && value !== 'sm' &&  value !== 'xs') {
            return new NextResponse('[VALUE NOT VALID]',{status: 400})
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
let size = await db.size.findUnique({
    where:{
        id: sizeId,
        storeId: storeId
    }
})
if (!size) {
    return new NextResponse('[SIZE NOT FOUND]',{status: 404})

}
         size = await db.size.update({
            where:{
                id: sizeId,
                storeId

            },
            data:{
                name,
                value
                
            }
        })
        return NextResponse.json(size)
    } catch (error) {
        return new NextResponse('[CREATING SIZE]',{status: 500})

    }
}