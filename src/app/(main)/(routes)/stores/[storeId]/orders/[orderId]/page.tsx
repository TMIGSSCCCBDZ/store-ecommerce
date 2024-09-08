import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { BillBoardFormCreate } from '../_components/billboard-form-create'
import { getProfile } from '@/lib/get-profile'

interface PageProps {
    params: {
        storeId: string
        ,orderId: string}
}
const page = async({params}: PageProps) => {
    const profile = await getProfile()
    const storeId = params.storeId
    const orderId = params.orderId
    const store = await db.store.findUnique({
        where:{
            id: storeId,
            profileId: profile.id
        }
    })
    if (!store) {
        return redirect('/')
    }
  
    const order = await db.order.findUnique({
        where:{
            id: orderId,
            storeId: storeId
        },
      
    })
   
   
  return (
    <div className='flex flex-col p-8 '>

        <BillBoardFormCreate order={order} store={store}  />
    </div>
  )
}

export default page