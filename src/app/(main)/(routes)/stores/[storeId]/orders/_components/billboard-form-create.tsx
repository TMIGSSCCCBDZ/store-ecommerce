"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Billboard, Category, Order, Store } from "@prisma/client"
import { Heading } from "../../settings/_components/heading" 
import { Button } from "@/components/ui/button"
import { Trash, Truck } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ToastAction } from "@radix-ui/react-toast"
import { useModal } from "../../../../../../../../hooks/use-modal-store"
import { AlertApi } from "@/components/api-alert"
import { useOrigin } from "../../../../../../../../hooks/use-origin"
import { UploadZone } from "./upload-zone"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    name: z.string().min(3, {message:'Just add more letters, please'}),
    billboardId:z.string()
})

interface BillboardProps {
    order: Order | null
    store: Store

}

export const BillBoardFormCreate = ({order, store }: BillboardProps) => {
   
    

    return (
        <div className='flex flex-col '>
          
            
            

        </div>
    )
}