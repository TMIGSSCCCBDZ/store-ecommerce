import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { NextResponse } from "next/server"

export const POST = async(req: Request,{params}:{params:{storeId: string}}) => {

    try {
        const profile =  await getProfile()
        const storeId = params.storeId
        const {name, price, categoryId, sizeId, colorId, images,isArchived, isFeatured }  = await req.json()
    
        if (!profile) {
            return new NextResponse('[UNAUTHORIZED]',{status: 401})
        }
        if (!storeId) {
            return new NextResponse('[STORE ID NOT FOUND]',{status: 400})
        }
        if (!name) {
            return new NextResponse('[NAME NOT FOUND]',{status: 400})
        }
        if (!price) {
            return new NextResponse('[PRICE NOT FOUND]',{status: 400})
        }
        if (!categoryId) {
            return new NextResponse('[CATEGORYID  NOT FOUND]',{status: 400})
        }
        if (!sizeId) {
            return new NextResponse('[SIZEID  NOT FOUND]',{status: 400})
        }
        if (!colorId) {
            return new NextResponse('[COLORID  NOT FOUND]',{status: 400})
        }
        if (!images) {
            return new NextResponse('[IMAGES  NOT FOUND]',{status: 400})
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
        const category = await db.category.findUnique({
            where: {
                id: categoryId,
                storeId: storeId
            }
        })
        if (!category) {
            return new NextResponse('[CATEGORY NOT FOUND]',{status: 404})
        }
        const size = await db.size.findUnique({
            where: {
                id: sizeId,
               storeId
            }
        })
        if (!size) {
            return new NextResponse('[SIZE NOT FOUND]',{status: 404})
        }
        const color = await db.color.findUnique({
            where: {
                id: colorId,
               storeId
            }
        })
        if (!color) {
            return new NextResponse('[COLOR NOT FOUND]',{status: 404})
        }
        const product = await db.product.create({
            data:{
                name,
                price,
                storeId,
                colorId,
                sizeId,
                categoryId,
                isArchived,
                isFeatured,
                images:{
                   createMany:{ 
                    data:[
                        ...images.map((image: {url: string})=> image)
                    ]
                   }
                }
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        return new NextResponse('[CREATING SIZE]',{status: 500})

    }
}