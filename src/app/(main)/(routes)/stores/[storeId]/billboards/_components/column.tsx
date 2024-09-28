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
  label: string
  createdAt:string
 
}

export const columns: ColumnDef<BillBoardColumn>[] = [
  
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const CellAction = () => {
          const billboard = row.original

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
              onClick={() => {navigator.clipboard.writeText(billboard.id)
            toast({
                variant:"default",
                title: "Success",
                description: "Billboard ID copied to clipboard",
            })
            }}
          
          >
             Copy billboard ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> {router.push(`/stores/${storeId}/billboards/${billboard.id}`)}}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={()=> {onOpen('deleteBillboard',{storeId: storeId as any, billboardId: billboard.id})}} >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      }
    
    },
  },
 
]
