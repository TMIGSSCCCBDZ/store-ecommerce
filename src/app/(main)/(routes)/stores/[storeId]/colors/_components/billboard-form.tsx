"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { redirect, useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { BillBoardColumn, useColumns } from "./column"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/api-list"
interface BillBoardProps {
    billboards: BillBoardColumn[] 
}


export const BillBoardForm = ({billboards}: BillBoardProps) => {
const params = useParams()
const router = useRouter()
const storeId = params.storeId
if (!storeId) {
    return redirect("/")
}
    const onClick = () => {

        router.push(`/stores/${storeId}/colors/new`)

    }
   
    return (
       <>
        <div className="flex justify-between items-center ">
            <p className="text-2xl font-bold">Colors ({billboards?.length !== 0 ? billboards?.length : 0})</p>
            <Button onClick={onClick} variant={'default'}>
                <Plus className="w-4 h-4 mr-2" />
                Add Color
            </Button>
        </div>
        <Separator className="my-3" />
        <DataTable columns={useColumns} data={billboards} filterKey="name" />
        <Separator className="my-3" />
       
        <ApiList entityName="colors" entityNameId="colorId" storeId={storeId}  />
       </>
    )
}