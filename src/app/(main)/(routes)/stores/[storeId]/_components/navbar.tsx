import { ModeToggle } from "@/components/mode-toggle"
import { UserButton } from "@clerk/nextjs"
import { MenuNav } from "./menu-nav"
import { StoreSwitcher } from "./store-switcher"
import { db } from "@/lib/db"
import { getProfile } from "@/lib/get-profile"
import { auth } from "@clerk/nextjs/server"

export const NavBar = async() => {
    const profile = await getProfile()
    if (!profile) {
        return auth().redirectToSignIn()
    }
    const stores = await db.store.findMany({
        where:{
            profileId: profile.id
        }
    })


    return (
        <div className="flex px-4 py-3 gap-x-5 items-center justify-start w-full  shadow-sm">
<div>
<StoreSwitcher stores={stores} />
</div>
<div>
     <MenuNav />
</div>
           
            <div className="flex items-center ml-auto gap-x-4 ">
                <ModeToggle />
                <UserButton  />
            </div>
        </div>
    )
} 