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
import { Billboard, Category, Size, Store } from "@prisma/client"
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
    value:z.string()
}).refine(
  (values) => {
    return values.value === 'xxxl' || values.value === 'xxl' || values.value === 'xl' || values.value === 'lg' || values.value === 'md' || values.value === 'sm'  || values.value === 'sm' 

  },
  {
    message: "try values like xl, lg ,md",
    path: ['value']
   
  }
)

interface BillboardProps {
    size: Size | null
    store: Store
    
}

export const BillBoardFormCreate = ({size, store}: BillboardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const label = size ? "Edit" : "Create"
    const description = size ?`Edit your ${size.name}` : "Create a size" 
    const toastMessage = size ?`your ${size.name} edited` : "created successfully" 



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: '',
            value:""
           
        }
    })
    useEffect(() => {
      if (size) {
        form.setValue('name', size.name)
        form.setValue('value', size.value)


      }
     
    }, [size, form]);

    const onSubmit = async(data:z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (size) {
              await axios.patch(`/api/stores/${store?.id}/sizes/${size.id}/edit`, data)

            }
            if (!size) {
            await axios.post(`/api/stores/${store?.id}/sizes/create`, data)
          

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
                {size && (
                         <Button disabled={isLoading} onClick={() => {onOpen("deleteSize",{store, size})}} variant={'destructive'} size={'icon'}>
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
         
          name="name"
          render={({ field }) => (
            <FormItem>
          
          <FormLabel>
            Name
          </FormLabel>
              <FormControl>
                <Input  disabled={isLoading} placeholder={`your size `} {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
         
          name="value"
          render={({ field }) => (
            <FormItem>
          
          <FormLabel>
            Value
          </FormLabel>
              <FormControl className="">
            
                <Input  disabled={isLoading} placeholder={`your value name`} {...field} />

         
             
              
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