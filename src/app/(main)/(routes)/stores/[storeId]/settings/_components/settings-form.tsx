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
import { Store } from "@prisma/client"
import { Heading } from "./heading"
import { Button } from "@/components/ui/button"
import { Trash, Truck } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ToastAction } from "@radix-ui/react-toast"
import { useModal } from "../../../../../../../../hooks/use-modal-store"
import { AlertApi } from "@/components/api-alert"
import { useOrigin } from "../../../../../../../../hooks/use-origin"

const formSchema = z.object({
    name: z.string().min(3, {message:'Just add more letters, please'})
})

interface SettingsFormProps {
    store: Store
}

export const SettingsForm = ({store}: SettingsFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const origin = useOrigin()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:""
        }
    })

    const onSubmit = async(data:z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/stores/${store?.id}`, data)
            router.refresh()
            toast({
                variant: "default",
                title: "success",
                description: "your edit has been done",
              })
            
            
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
        }finally{
            setIsLoading(false)
        }

    }

   
    const {onOpen} = useModal()
    

    return (
        <div className='flex flex-col '>
            <div className="flex items-center justify-between w-full ">
                <Heading label="Settings" description="this where you can edit your server" />
                <Button disabled={isLoading} onClick={() => {onOpen("deleteStore",{store})}} variant={'destructive'} size={'icon'}>
                    <Trash className="w-4 h-4" />
                </Button>

            </div>
            <Separator />
            <div className="mt-8">
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2 space-y-6">
        <FormField
          control={form.control}
         
          name="name"
          render={({ field }) => (
            <FormItem>
          
              <FormControl>
                <Input disabled={isLoading} placeholder={`${store?.name}`} {...field} />
              </FormControl>
              <FormDescription>
                This is where you can edit your store.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">Save</Button>
      </form>
    </Form>
            </div>
            
            <Separator className="my-6" />

            <AlertApi title="NEXT_PUBLIC_SITE_URL" description={`${origin}/api/${store.id}`} variant="public" />
        </div>
    )
}