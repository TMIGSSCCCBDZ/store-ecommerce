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
    orders: BillBoardColumn[] 
}


export const BillBoardForm = ({orders}: BillBoardProps) => {
const params = useParams()
const router = useRouter()
const storeId = params.storeId
if (!storeId) {
    return redirect("/")
}
    const onClick = () => {

        router.push(`/stores/${storeId}/order/new`)

    }
    return (
       <>
        <div className="flex justify-between items-center ">
            <p className="text-2xl font-bold">Orders ({orders?.length !== 0 ? orders?.length : 0})</p>
           
        </div>
        <Separator className="my-3" />
        <DataTable columns={columns} data={orders} filterKey="products" />
        <Separator className="my-3" />
       
        <ApiList entityName="orders" entityNameId="orderId" storeId={storeId}  />
       </>
    )
}