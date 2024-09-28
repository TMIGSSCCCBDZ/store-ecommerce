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
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillBoardColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt:string
 
}

export const columns: ColumnDef<BillBoardColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original

      
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
              onClick={() => {navigator.clipboard.writeText(category.id)
            toast({
                variant:"default",
                title: "Success",
                description: "Category ID copied to clipboard",
            })
            }}
          
          >
             Copy category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> {router.push(`/stores/${storeId}/categories/${category.id}`)}}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={()=> {onOpen("deleteCategory",{storeId: storeId as any, categoryId: category.id})}} >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
 
]
