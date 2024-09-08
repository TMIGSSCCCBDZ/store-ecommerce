import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { SettingsForm } from './_components/settings-form'

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
        return redirect('/')
    }
    const store = await db.store.findFirst({
        where:{
            id: storeId,
            profileId: profile.id
        }
    })
    if (!store) {
        return redirect("/")
    }
  return (
    <div className='flex flex-col p-8'>
        <SettingsForm store={store} />
    </div>
  )
}

export default page