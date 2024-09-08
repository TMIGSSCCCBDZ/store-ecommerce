"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { redirect, useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { BillBoardColumn, columns } from "./column"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/api-list"
interface BillBoardProps {
    sizes: BillBoardColumn[] 
}


export const BillBoardForm = ({sizes}: BillBoardProps) => {
const params = useParams()
const router = useRouter()
const storeId = params.storeId
if (!storeId) {
    return redirect("/")
}
    const onClick = () => {

        router.push(`/stores/${storeId}/sizes/new`)

    }
   
    return (
       <>
        <div className="flex justify-between items-center ">
            <p className="text-2xl font-bold">Sizes ({sizes?.length !== 0 ? sizes?.length : 0})</p>
            <Button onClick={onClick} variant={'default'}>
                <Plus className="w-4 h-4 mr-2" />
                Add Size
            </Button>
        </div>
        <Separator className="my-3" />
        <DataTable columns={columns} data={sizes} filterKey="name" />
        <Separator className="my-3" />
       
        <ApiList entityName="sizes" entityNameId="sizeId" storeId={storeId}  />
       </>
    )
}