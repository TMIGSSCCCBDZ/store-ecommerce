import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { BillBoardFormCreate } from '../_components/billboard-form-create'
import { getProfile } from '@/lib/get-profile'
import { auth } from '@clerk/nextjs/server'

interface PageProps {
    params: {
        storeId: string
        ,colorId: string}
}
const page = async({params}: PageProps) => {
    const profile = await getProfile()
    const storeId = params.storeId
    const colorId = params.colorId
    if (!profile) {
        return auth().redirectToSignIn()
    }
    if(!storeId){
        return redirect("/")
    }
    const store = await db.store.findUnique({
        where:{
            id: storeId,
            profileId: profile.id
        }
    })
    if (!store) {
        return redirect('/')
    }
  
    const color = await db.color.findUnique({
        where:{
            id: colorId,
            storeId: storeId
        },
      
    })
 

   
  return (
    <div className='flex flex-col p-8 '>

        <BillBoardFormCreate color={color} store={store}  />
    </div>
  )
}

export default page