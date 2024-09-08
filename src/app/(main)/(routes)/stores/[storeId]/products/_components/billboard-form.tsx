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
    products: BillBoardColumn[] 
}


export const BillBoardForm = ({products}: BillBoardProps) => {
const params = useParams()
const router = useRouter()
const storeId = params.storeId
if (!storeId) {
    return redirect("/")
}
    const onClick = () => {

        router.push(`/stores/${storeId}/products/new`)

    }
    console.log(products)
    return (
       <>
        <div className="flex justify-between items-center ">
            <p className="text-2xl font-bold">Products ({products?.length !== 0 ? products.length : 0})</p>
            <Button onClick={onClick} variant={'default'}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
            </Button>
        </div>
        <Separator className="my-3" />
        <DataTable columns={columns} data={products} filterKey="name" />
        <Separator className="my-3" />
       
        <ApiList entityName="products" entityNameId="productId" storeId={storeId}  />
       </>
    )
}