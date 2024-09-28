import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { BillBoardFormCreate } from '../_components/billboard-form-create'
import { getProfile } from '@/lib/get-profile'
import { auth } from '@clerk/nextjs/server'

interface PageProps {
    params: {
        storeId: string
        ,billboardsId: string}
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
    const billboardId = params.billboardsId
    const store = await db.store.findUnique({
        where:{
            id: storeId,
            profileId: profile.id
        }
    })
    if (!store) {
        return redirect('/')
    }
  
    const billboard = await db.billboard.findUnique({
        where:{
            id: billboardId,
            storeId: storeId
        }
    })

   
  return (
    <div className='flex flex-col p-8 '>
        <BillBoardFormCreate billboard={billboard} store={store} />
    </div>
  )
}

export default page