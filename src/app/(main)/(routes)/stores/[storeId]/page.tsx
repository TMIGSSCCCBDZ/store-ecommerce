import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { Component } from './_components/area-chart'
import { Block } from './_components/block'

const page = async({params} : {params:{storeId: string}}) => {
  const profile = await getProfile()
  const storeId  = params.storeId
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
  const orders =  await db.order.findMany({
    where:{
      storeId,
      isPaid: true
    },
    include:{
      orderItems: {
        include:{
          product: true
        }
      }
    }
  })
  const products = await db.product.findMany({
    where:{
      storeId,
      isArchived: false
    }
  })
  const totalRenvenue = orders.reduce((total, item) => {
    
  const totalProducts =  item.orderItems.reduce((totalProducts, item) => {
    return totalProducts = totalProducts + Number(item.product.price)
    },0)
    return total + totalProducts
  },0)

  const TotalSales = orders.length
  const remaining = products.length

  const monthlyRenvenu = {} as any
  
  let monthNames = [ 
    {month:"January", price: 0},
    {month:"February", price: 0},
    {month:"March", price: 0},
   {month: "April", price: 0},
   { month:"May", price: 0},
   { month:"June", price: 0},
   {month: "July", price: 0},
    {month:"August", price: 0},
    {month:"September", price: 0},
    {month:"October", price: 0},
    {month:"November", price: 0},
    {month:"December", price: 0} 
  ];



  for (const order of orders) {
    let renvenu = 0
    const orderMonth = order.createdAt.getMonth()
    
    for (const item of order.orderItems) {
      renvenu += Number(item.product.price)
    }
   
       monthlyRenvenu[orderMonth] = (monthlyRenvenu[orderMonth] || 0) + renvenu
    
  }
for (let i = 0; i < monthNames.length; i++) {
  const element = monthNames[i];
   element.price = monthlyRenvenu[i] ? monthlyRenvenu[i] : 0
   
}

  console.log(monthNames)
  return (
    <div className='mt-4 pl-4 space-y-4'>
      <div className='flex items-center gap-x-2 '>
        <Block title='Total Profit' number={totalRenvenue} type='profit' /> 
        <Block title='Sales' number={TotalSales} type='sales' /> 
        <Block title='Rest in store' number={remaining} type='remaining' /> 

      </div>
      <Component chartData={monthNames} /> 
    </div>
  )
}

export default page