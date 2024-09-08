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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { toast } from "../ui/use-toast"
import { useState } from "react"
export const InitialModal = () => {
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof createStoreSchema>>({
        resolver: zodResolver(createStoreSchema),
        defaultValues:{
            name:""
        }

    })

    const onSubmit = async(data: z.infer<typeof createStoreSchema>) => {

        try {
            setisLoading(true)
            await axios.post('/api/stores/create', data)
            
            
        } catch (error) {
            return null
        }finally{
            setisLoading(false)
            router.refresh()
            window.location.reload()
        }
       
}
    return (
        <Dialog open>
   
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create store</DialogTitle>
            <DialogDescription>
              you don't have any stores yet, start by creating one here
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
                <Input className="border-none dark:bg-zinc-900/60"  placeholder="mobile shop" {...field}  />
              </FormControl>
              <FormDescription>
                This is your public store name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
            <Button  type="submit">Create</Button>
          </DialogFooter>
      </form>
    </Form>
        
        </DialogContent>
      </Dialog>
    )
}