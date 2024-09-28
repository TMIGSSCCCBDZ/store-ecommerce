import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { BillBoardFormCreate } from '../_components/billboard-form-create'
import { getProfile } from '@/lib/get-profile'
import { auth } from '@clerk/nextjs/server'

interface PageProps {
    params: {
        storeId: string
        ,categoryId: string}
}
const page = async({params}: PageProps) => {
    const profile = await getProfile()
    if (!profile) {
        return auth().redirectToSignIn()
    }
    
    const storeId = params.storeId
    if (!storeId) {
        return redirect("/")
    }
    const categoryId = params.categoryId
    const store = await db.store.findUnique({
        where:{
            id: storeId,
            profileId: profile.id
        }
    })
    if (!store) {
        return redirect('/')
    }
  
    const category = await db.category.findUnique({
        where:{
            id: categoryId,
            storeId: storeId
        },
        include:{
            billboard: true
        }
    })
    const billboards = await db.billboard.findMany({
        where:{
            storeId
        }
    })

   
  return (
    <div className='flex flex-col p-8 '>

        <BillBoardFormCreate category={category} store={store} billboards={billboards} />
    </div>
  )
}

export default page