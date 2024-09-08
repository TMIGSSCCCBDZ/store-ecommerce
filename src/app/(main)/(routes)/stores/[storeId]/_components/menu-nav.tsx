"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams } from "next/navigation"
import { usePathname } from "next/navigation"
import {
    Cloud,
    CreditCard,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
   
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
   
export const MenuNav = () => {
    const params = useParams()
    const storeId = params.storeId
    const pathname = usePathname()

    const routes = [
        {
            label:'Overview',
            href:`/stores/${storeId}`,
            active: pathname === `/stores/${storeId}`
        },
        {
            label:'Settings',
            href:`/stores/${storeId}/settings`,
            active: pathname === `/stores/${storeId}/settings`
        }, {
            label:'Billboards',
            href:`/stores/${storeId}/billboards`,
            active: pathname === `/stores/${storeId}/billboards`
        },
        {
            label:'Categories',
            href:`/stores/${storeId}/categories`,
            active: pathname === `/stores/${storeId}/categories`
        },
        {
            label:'Sizes',
            href:`/stores/${storeId}/sizes`,
            active: pathname === `/stores/${storeId}/sizes`
        },
          {
            label:'Colors',
            href:`/stores/${storeId}/colors`,
            active: pathname === `/stores/${storeId}/colors`
        },
        {
          label:'Products',
          href:`/stores/${storeId}/products`,
          active: pathname === `/stores/${storeId}/products`
      },
      {
        label:'Orders',
        href:`/stores/${storeId}/orders`,
        active: pathname === `/stores/${storeId}/orders`
    },
    ]

    return (
        <>
          <div className="hidden md:flex items-center gap-x-3">
          {routes.map((route) => (
            <Link href={route.href} key={route.href} className={cn("hover:text-zinc-100 transition", route.active ? "dark:text-white text-black" : 'text-zinc-400')} >
                {route.label}
            </Link>
          ))}

        </div>
        <div className="flex md:hidden">
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">Option</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        {routes.map((route) => (
            <DropdownMenuItem  key={route.href} className={cn("hover:text-zinc-100 transition", route.active ? "dark:text-white text-black" : 'text-zinc-400')} >
              <Link href={route.href}>
                     {route.label}
              </Link>
           
            </DropdownMenuItem>
          ))}
        
        </DropdownMenuGroup>
  
     
      
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
        </>
      
    )
}