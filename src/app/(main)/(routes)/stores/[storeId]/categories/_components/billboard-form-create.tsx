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
import { Billboard, Category, Store } from "@prisma/client"
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
    category: Category | null
    store: Store
    billboards: Billboard[]
}

export const BillBoardFormCreate = ({category, store, billboards}: BillboardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const label = category ? "Edit" : "Create"
    const description = category ?`Edit your ${category.name}` : "Create a category" 
    const toastMessage = category ?`your ${category.name} edited` : "created successfully" 



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: '',
            billboardId:""
           
        }
    })
    useEffect(() => {
      if (category) {
        form.setValue('name', category.name)
        form.setValue('billboardId', category.billboardId)


      }
     
    }, [category, form]);

    const onSubmit = async(data:z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (category) {
              await axios.patch(`/api/stores/${store?.id}/categories/${category.id}/edit`, data)

            }
            if (!category) {
            await axios.post(`/api/stores/${store?.id}/categories/create`, data)
          

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
                {category && (
                         <Button disabled={isLoading} onClick={() => {onOpen("deleteCategory",{store, category})}} variant={'destructive'} size={'icon'}>
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
                <Input  disabled={isLoading} placeholder={`your category name`} {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="billboardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billboard</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select billboard to add" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
             
                  {billboards.map(billboard => (
                  <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>

                  ))}
                
                </SelectContent>
              </Select>
           
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