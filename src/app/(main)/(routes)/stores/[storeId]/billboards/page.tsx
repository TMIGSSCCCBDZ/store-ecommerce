import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { BillBoardForm } from './_components/billboard-form'
import { BillBoardColumn } from './_components/column'
import { compareAsc, format } from "date-fns";
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
const billboards = await db.billboard.findMany({
    where:{
        storeId: storeId
    },
    orderBy:{
        createdAt:'desc'
    }
})

   const formattedBillboards : BillBoardColumn[] = billboards.map(billboard => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(new Date(billboard.createdAt), FORMATED_DATE)

   }))
  return (
    <div className='flex flex-col p-8 space-y-4'>
        <BillBoardForm  billboards={formattedBillboards}/>
        
    </div>
  )
}

export default page