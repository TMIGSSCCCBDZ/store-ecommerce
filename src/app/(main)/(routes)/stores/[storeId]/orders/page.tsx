import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { BillBoardForm } from './_components/billboard-form'
import { BillBoardColumn } from './_components/column'
import { compareAsc, format } from "date-fns";
import { formatter } from '@/lib/utils'
const FORMATED_DATE = 'd MMM yyyy'
interface PageProps {
    params: {storeId: string}
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
const store = await db.store.findUnique({
    where:{
        id: storeId,
        profileId: profile.id
    }
})
    
if (!store) {
    return redirect("/")
}
const orders = await db.order.findMany({
    where:{
        storeId: storeId
    },
    include:{
        orderItems:{
            include:{
                product: true
            }
        }
    }
    ,
    orderBy:{
        createdAt:'desc'
    }
})

   const formattedBillboards : BillBoardColumn[] = orders.map(order => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems.map(product => product.product.name).join(', '),
    price: formatter.format(order.orderItems.reduce((total, item) => total += Number(item.product.price) ,0)),
    createdAt: format(new Date(order.createdAt), FORMATED_DATE)

   }))
  return (
    <div className='flex flex-col p-8 space-y-4'>
        <BillBoardForm  orders={formattedBillboards}/>
        
    </div>
  )
}

export default page