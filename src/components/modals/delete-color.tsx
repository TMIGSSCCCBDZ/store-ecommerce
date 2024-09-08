"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { redirect, useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { createStoreSchema } from "../../../schemas"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useModal } from "../../../hooks/use-modal-store"
import { toast } from "../ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { Store } from "@prisma/client"
import qs from 'query-string'
export const DeleteColorModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    
    const router = useRouter()
    const {isOpen, type, onClose} = useModal()
    const modalOpened = isOpen && type === "deleteColor"
    const {data} = useModal()
    const {store, color, storeId, colorId } = data  as any
    

    

 

    const onSubmit = async() => {

        try {
            
            setIsLoading(true)
            const url = qs.stringifyUrl({
                url: `/api/stores/${store ? store?.id : storeId}/colors/${color? color?.id : colorId}/delete`,
               
            })
            await axios.delete(url)
            router.refresh()
        
            toast({
                variant:"default",
                title:'success',
                description:`${color ? color?.name : ""}  deleted successfully`
            })
            
           
        } catch (error) {
            toast({
                variant:'destructive',
                title:'Error',
                description:"error while deleting",
                action: <ToastAction onClick={onSubmit} altText="Try again">Try again</ToastAction>,

            })
        }finally{
            setIsLoading(false)
            onClose()
            
        }
       
}
   



    return (
        <Dialog open={modalOpened} onOpenChange={onClose}>
   
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Color</DialogTitle>
            <DialogDescription>
            are you sure you want to delete <span className="font-bold text-destructive">{color?.name}</span>
            </DialogDescription>
          </DialogHeader>
      
        <DialogFooter>
        <Button onClick={onClose} variant={"outline"}>{isLoading ?  (<Loader2 className="w-4 h-4 animate-spin" />) : ('Cancel')}</Button>

            <Button onClick={onSubmit}  type="submit" variant={"destructive"}>{isLoading ?  (<Loader2 className="w-4 h-4 animate-spin" />) : ('Delete')}</Button>
          </DialogFooter>
 
        
        </DialogContent>
      </Dialog>
    )
}