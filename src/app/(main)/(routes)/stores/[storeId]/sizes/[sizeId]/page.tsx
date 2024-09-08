import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { BillBoardFormCreate } from '../_components/billboard-form-create'
import { getProfile } from '@/lib/get-profile'

interface PageProps {
    params: {
        storeId: string
        ,sizeId: string}
}
const page = async({params}: PageProps) => {
    const profile = await getProfile()
    const storeId = params.storeId
    const sizeId = params.sizeId
    const store = await db.store.findUnique({
        where:{
            id: storeId,
            profileId: profile.id
        }
    })
    if (!store) {
        return redirect('/')
    }
  
    const size = await db.size.findUnique({
        where:{
            id: sizeId,
            storeId: storeId
        },
      
    })


   
  return (
    <div className='flex flex-col p-8 '>

        <BillBoardFormCreate size={size} store={store}  />
    </div>
  )
}

export default page