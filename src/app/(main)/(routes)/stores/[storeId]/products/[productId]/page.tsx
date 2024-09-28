import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { BillBoardFormCreate } from '../_components/billboard-form-create'
import { getProfile } from '@/lib/get-profile'
import { auth } from '@clerk/nextjs/server'

interface PageProps {
    params: {
        storeId: string
        ,productId: string}
}
const page = async({params}: PageProps) => {
    const profile = await getProfile()
    const storeId = params.storeId
    if (!profile) {
        return auth().redirectToSignIn()
    }
    if (!storeId) {
        return redirect("/")
    }
    const productId = params.productId
    const store = await db.store.findUnique({
        where:{
            id: storeId,
            profileId: profile.id
        }
    })
    if (!store) {
        return redirect('/')
    }
  
    const product = await db.product.findUnique({
        where:{
            id: productId,
            storeId: storeId
        },
        include:{
            category:true,
            color:true,
            size:true,
            images: true
        }
    })

    const categories = await db.category.findMany({
        where:{
            storeId
        }
    })

    const colors = await db.color.findMany({
        where:{
            storeId
        }
    })
  
    const sizes = await db.size.findMany({
        where:{
            storeId
        }
    })
  

   
  return (
    <div className='flex flex-col p-8 '>

        <BillBoardFormCreate product={product} store={store} categories={categories} colors={colors} sizes={sizes} />
    </div>
  )
}

export default page