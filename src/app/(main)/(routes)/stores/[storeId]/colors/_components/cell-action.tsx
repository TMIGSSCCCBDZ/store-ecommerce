import { useRouter } from "next/navigation"
import { BillBoardColumn } from "./column"
import { useParams } from "next/navigation"
import { useModal } from "../../../../../../../../hooks/use-modal-store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
interface CellActionProps{
    color: BillBoardColumn
}

 export const CellAction = ({color}: CellActionProps) =>{ 

      
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
              onClick={() => {navigator.clipboard.writeText(color.id)
            toast({
                variant:"default",
                title: "Success",
                description: "color ID copied to clipboard",
            })
            }}
          
          >
             Copy color ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> {router.push(`/stores/${storeId}/colors/${color.id}`)}}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={()=> {onOpen("deleteColor",{storeId: storeId as any, colorId: color.id})}} >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
     }