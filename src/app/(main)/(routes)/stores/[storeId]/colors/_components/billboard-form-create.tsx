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
import { Billboard,  Color, Store } from "@prisma/client"
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
    value:z.string().regex(/^#/,{message:"inter a valid HEX #000"
    })
})

interface BillboardProps {
    color: Color | null
    store: Store
    
}

export const BillBoardFormCreate = ({color, store}: BillboardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const label = color ? "Edit" : "Create"
    const description = color ?`Edit your ${color.name}` : "Create a Color" 
    const toastMessage = color ?`your ${color.name} edited` : "created successfully" 



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: '',
            value:""
           
        }
    })
    useEffect(() => {
      if (color) {
        form.setValue('name', color.name)
        form.setValue('value', color.value)


      }
     
    }, [color, form]);

    const onSubmit = async(data:z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (color) {
              await axios.patch(`/api/stores/${store?.id}/colors/${color.id}/edit`, data)

            }
            if (!color) {
            await axios.post(`/api/stores/${store?.id}/colors/create`, data)
          

            }
            router.refresh()
            router.push(`/stores/${store?.id}/colors`)
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
                {color && (
                         <Button disabled={isLoading} onClick={() => {onOpen("deleteColor",{store, color})}} variant={'destructive'} size={'icon'}>
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
                <Input  disabled={isLoading} placeholder={`your color name`} {...field} />
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
            value
          </FormLabel>
              <FormControl>
                <div className="flex items-center gap-x-2">
                                  <Input  disabled={isLoading} placeholder={`your color HEX`} {...field} />
                                  <div className="w-12 h-8 rounded-md" style={{backgroundColor: field.value}} />

                </div>
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