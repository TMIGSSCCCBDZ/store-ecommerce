import { InitialModal } from '@/components/modals/initial-modal'
import { db } from '@/lib/db'
import { getProfile } from '@/lib/get-profile'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {

  const profile = await getProfile()
  if (!profile) {
    return auth().redirectToSignIn()
  }
  const store = await db.store.findFirst({
    where:{
      profileId: profile.id
    }
  })
  if (store) {
    return redirect(`/stores/${store.id}`)
  }
  return (
    <InitialModal />
  )
}

export default page