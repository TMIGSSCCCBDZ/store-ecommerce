import { Heading } from "@/app/(main)/(routes)/stores/[storeId]/settings/_components/heading"
import { AlertApi } from "./api-alert"
import { useOrigin } from "../../hooks/use-origin"

interface ApiListProps {
    entityName: string
    entityNameId: string
    storeId: string |  string[] | null
}

export const ApiList = ({entityName, entityNameId,storeId}: ApiListProps) => {
    const origin = useOrigin()

    return (
        <div>
            <Heading label="API" description="your prebuilt APIs" />
            <div className="space-y-3">
                <AlertApi title="GET" description={`${origin}/api/stores/${storeId}/${entityName}`} variant="public" />
                <AlertApi title="GET" description={`${origin}/api/stores/${storeId}/${entityName}/{${entityNameId}}`} variant="public" />
                <AlertApi title="POST" description={`${origin}/api/stores/${storeId}/${entityName}/create`} variant="admin" />
                <AlertApi title="PATCH" description={`${origin}/api/stores/${storeId}/${entityName}/{${entityNameId}}/edit`} variant="admin" />
                <AlertApi title="DELETE" description={`${origin}/api/stores/${storeId}/${entityName}/{${entityNameId}}/delete`} variant="admin" />

            </div>
        
        </div>
    )
}