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
const products = await db.product.findMany({
    where:{
        storeId: storeId
    },
    include:{
        category: true,
        color: true,
        size: true,
    }
    ,
    orderBy:{
        createdAt:'desc'
    }
})

   const formattedBillboards : BillBoardColumn[] = products.map(product => ({
    id: product.id,
    name: product.name,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.value,
    isArchived: product.isArchived,
    isFeatured: product.isFeatured,
    color: product.color.value,
    createdAt: format(new Date(product.createdAt), FORMATED_DATE)

   }))
  return (
    <div className='flex flex-col p-8 space-y-4'>
        <BillBoardForm  products={formattedBillboards}/>
        
    </div>
  )
}

export default page