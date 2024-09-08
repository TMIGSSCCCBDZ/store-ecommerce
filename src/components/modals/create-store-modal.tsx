"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
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
export const CreateStoreModal = () => {
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter()
    const {isOpen, type, onClose} = useModal()
    const modalOpened = isOpen && type === 'createSrore'

    const form = useForm<z.infer<typeof createStoreSchema>>({
        resolver: zodResolver(createStoreSchema),
        defaultValues:{
            name:""
        }

    })

    const onSubmit = async(data: z.infer<typeof createStoreSchema>) => {

        try {
            setisLoading(true)
           const response = await axios.post('/api/stores/create', data)
           router.push(`/stores/${response.data.id}`)
            
            
        } catch (error) {
            return null
        }finally{
            setisLoading(false)
            handleClose()
            router.refresh()
         
        }
       
}
     const handleClose  = () => {
        onClose()
        form.reset()
     }




    return (
        <Dialog open={modalOpened} onOpenChange={handleClose}>
   
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create store</DialogTitle>
            <DialogDescription>
            Create new store 
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isLoading} className="border-none dark:bg-zinc-900/60"  placeholder="mobile shop" {...field}  />
              </FormControl>
              <FormDescription>
                This is your public store name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
            <Button  type="submit">{isLoading ?  (<Loader2 className="w-4 h-4 animate-spin" />) : ('Create')}</Button>
          </DialogFooter>
      </form>
    </Form>
        
        </DialogContent>
      </Dialog>
    )
}