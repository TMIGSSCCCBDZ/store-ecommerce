"use client"
import { Button } from "@/components/ui/button"
import { Cloud, CloudUpload, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { useEffect, useState } from "react";

interface UploadZoneProps {
    diabled?: boolean,
    onChange: (url: string ) => void,
    onRemove: (url: string ) => void,


    value: string[]
}


export const UploadZone = ({diabled, onChange,  value, onRemove}: UploadZoneProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
   setIsMounted(true)
    }, [])
    const onUpload = (result: any) => {
      onChange(result?.info?.secure_url)
    }

   
    if (!isMounted) {
        return null
    }
    console.log(value)

 

    return (
        <>
        <div className="w-full flex flex-col space-y-3 items-center">
            <div className='flex items-center  gap-x-2 overflow-x-auto'>
                   {value?.map((url) => (
                <div key={url} className="relative  w-48 h-48 overflow-hidden border rounded-md ">
                    <Button type="button" onClick={() =>   onRemove(url) }   variant='destructive' className="z-10 w-10 h-10 rounded-md absolute top-2 right-2 flex items-center ">

                        <Trash className="" />
                    </Button>
                    <Image src={url} alt="image" fill className="object-cover" />
                </div>
            ))}
            </div>
         
           <CldUploadWidget
           
  uploadPreset="odqnb24x"
  onUpload={onUpload}

>
  {({ open }) => {
    function handleOnClick() {
   
      open();
    }
    return (
      <Button type="button" className="gap-x-2" onClick={handleOnClick}>
<CloudUpload />
        Upload an Image
      </Button>
    );
  }}
</CldUploadWidget>





        </div>
        </>
    )

    
}