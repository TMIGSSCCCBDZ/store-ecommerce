"use client"
import { Copy, MoreHorizontal } from "lucide-react"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useModal } from "../../../../../../../../hooks/use-modal-store"
import { toast } from "@/components/ui/use-toast"
import { Decimal } from "@prisma/client/runtime/library"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillBoardColumn = {
  id: string
  name: string
  price: string
  color: string
  size: string
  category: string
  isArchived: boolean
  isFeatured: boolean
  createdAt:string
 
}

export const columns: ColumnDef<BillBoardColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  }, {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const color = row.original.color
      return (
        <div className="flex items-center gap-x-2">
          <div className="w-4 h-4 rounded-full" style={{backgroundColor: color}} />
          {color}
        </div>
      )
    }
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      
 const router = useRouter()
 const params = useParams()
 const storeId = params.storeId
 const {onOpen} = useModal()
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {navigator.clipboard.writeText(product.id)
            toast({
                variant:"default",
                title: "Success",
                description: "product ID copied to clipboard",
            })
            }}
          
          >
             Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> {router.push(`/stores/${storeId}/products/${product.id}`)}}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={()=> {onOpen('deleteProduct',{storeId: storeId as any, productId: product.id})}} >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
 
]
