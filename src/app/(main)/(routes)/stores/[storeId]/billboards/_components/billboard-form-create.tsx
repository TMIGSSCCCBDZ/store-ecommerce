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
import { Billboard, Store } from "@prisma/client"
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

const formSchema = z.object({
    name: z.string().min(3, {message:'Just add more letters, please'}),
    imageUrl:z.string()
})

interface BillboardProps {
    billboard: Billboard | null
    store: Store
}

export const BillBoardFormCreate = ({billboard, store}: BillboardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const label = billboard ? "Edit" : "Create"
    const description = billboard ?`Edit your ${billboard.label}` : "Create a billboard" 
    const toastMessage = billboard ?`your ${billboard.label} edited` : "created successfully" 



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: '',
            imageUrl:''
        }
    })
    useEffect(() => {
      if (billboard) {
        form.setValue('name', billboard.label)
        form.setValue('imageUrl', billboard.imageUrl)

      }
     
    }, [billboard, form]);

    const onSubmit = async(data:z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (billboard) {
              await axios.patch(`/api/stores/${store?.id}/billboards/${billboard.id}/edit`, data)

            }
            if (!billboard) {
            await axios.post(`/api/stores/${store?.id}/billboards/create`, data)
          

            }
            router.refresh()
            toast({
                variant: "default",
                title: "success",
                description: `${toastMessage}`,
              })
            
            
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                /** @ts-ignore */
                action: <ToastAction onClick={onSubmit} altText="Try again">Try again</ToastAction>,
              })
        }finally{
            setIsLoading(false)
        }
 
    }

   
    const {onOpen} = useModal()
    
    

    return (
        <div className='flex flex-col '>
            <div className="flex items-center justify-between w-full ">
                <Heading label={label} description={description} />
                {billboard && (
                         <Button disabled={isLoading} onClick={() => {onOpen("deleteBillboard",{store, billboard})}} variant={'destructive'} size={'icon'}>
                    <Trash className="w-4 h-4" />
                </Button>
                )}
         

            </div>
            <Separator />
            <div className="mt-8">
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
      <FormField
          control={form.control}
         
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
          
      
              <FormControl>
                <UploadZone value={field.value ? [field.value] : []} onChange={field.onChange} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
         
          name="name"
          render={({ field }) => (
            <FormItem>
          
          <FormLabel>
            Label
          </FormLabel>
              <FormControl>
                <Input  disabled={isLoading} placeholder={`your billboard name`} {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">Save</Button>
      </form>
    </Form>
            </div>
            
            

        </div>
    )
}