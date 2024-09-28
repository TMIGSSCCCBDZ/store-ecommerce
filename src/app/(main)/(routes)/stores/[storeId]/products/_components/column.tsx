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
import { CellAction } from "./cell-action"
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

export const useColumns: ColumnDef<BillBoardColumn>[] = [
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
    cell: ({ row }) =><CellAction product={row.original} /> 
  }
]
