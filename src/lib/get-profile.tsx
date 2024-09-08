import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "./db"

export const getProfile = async() => {
    try {
           const {userId} = auth()
    const user = await currentUser()

    const profile = await db.profile.findUnique({
        where:{
            userId: userId as string
        }
    })
    if (profile) {
        return profile
    }
    const newProfile = await db.profile.create({
        data:{
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.emailAddresses[0].emailAddress as string,
          imageUrl: user?.imageUrl as string,
          userId: user?.id as string

        }
    })

    return newProfile
 
    } catch (error) {
        return null
    }

    
}