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
import { Billboard, Category, Color, Image, Product, Size, Store } from "@prisma/client"
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
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    name: z.string().min(3, {message:'Just add more letters, please'}),
    images: z.object({url: z.string()}).array(),
    price:z.coerce.number(),
    colorId: z.string() ,
    sizeId: z.string() ,
    categoryId: z.string() ,
    isArchived: z.boolean().optional(),
    isFeatured: z.boolean().optional()


})

interface BillboardProps {
   product: Product & {images: Image[]} | null
    store: Store
    sizes: Size[]
    categories: Category[]
    colors: Color[]

    
}

export const BillBoardFormCreate = ({product, store, categories, sizes, colors}: BillboardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const label = product ? "Edit" : "Create"
    const description = product ?`Edit your ${product.name}` : "Create a product" 
    const toastMessage = product ?`your ${product.name} edited` : "created successfully" 



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: '',
            images:[],
            price:0,
            isArchived: false,
            isFeatured: false,
            categoryId:"",
            sizeId:"",
            colorId:""
           
        }
    })

    useEffect(() => {
      if (product) {
        form.setValue('name', product.name)
        form.setValue('price', parseFloat(product.price.toString()))
        form.setValue('images', product.images)

        form.setValue("isArchived", product.isArchived)
        form.setValue('isFeatured', product.isFeatured)
        form.setValue('colorId', product.colorId)
        form.setValue('sizeId', product.sizeId)
        form.setValue('categoryId', product.categoryId)



       


      }
     
    }, [product, form]);

    const onSubmit = async(data:z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (product) {
              await axios.patch(`/api/stores/${store?.id}/products/${product.id}/edit`, data)

            }
            if (!product) {
            await axios.post(`/api/stores/${store?.id}/products/create`, data)
          

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
                {product && (
                         <Button disabled={isLoading} onClick={() => {onOpen("deleteProduct",{store, product})}} variant={'destructive'} size={'icon'}>
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
         
          name="images"
          render={({ field }) => (
            <FormItem>
          
          <FormLabel>
            Images
          </FormLabel>
              <FormControl>
               <UploadZone value={field.value.map(image=> image.url)} onChange={(url: string) => field.onChange([...field.value, {url}])} onRemove={(url: string) => field.onChange([...field.value.filter(current => current.url !== url )])}   />
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
            Name
          </FormLabel>
              <FormControl>
                <Input  disabled={isLoading} placeholder={`Shirt`} {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
         
          name="price"
          render={({ field }) => (
            <FormItem>
          
          <FormLabel>
            Price
          </FormLabel>
              <FormControl>
                <Input type="number"  disabled={isLoading} placeholder={`9.99`} {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />      <FormField
        control={form.control}
        name="isFeatured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
               IsFeatured
              </FormLabel>
              <FormDescription>
               Do you want to be displayed on the home page
              </FormDescription>
            </div>
          </FormItem>
        )}
      /> 
          <FormField
          control={form.control}
          name="isArchived"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                IsArchived
                </FormLabel>
                <FormDescription>
                 Do you want to be displayed on the sotre completely e.g under development
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
             
                  {categories?.map(category => (
                  <SelectItem value={category?.id}>{category?.name}</SelectItem>

                  ))}
                
                </SelectContent>
              </Select>
           
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="sizeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
             
                  {sizes?.map(size => (
                  <SelectItem value={size?.id}>{size?.name}</SelectItem>

                  ))}
                
                </SelectContent>
              </Select>
           
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="colorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
             
                  {colors?.map(color => (
                  <SelectItem value={color?.id}>{color?.name}</SelectItem>

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