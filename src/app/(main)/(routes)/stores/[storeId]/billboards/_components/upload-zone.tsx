"use client"
import { Button } from "@/components/ui/button"
import { Cloud, CloudUpload, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { useEffect, useState } from "react";

interface UploadZoneProps {
    diabled?: boolean,
    onChange: (url?: string | CloudinaryUploadWidgetInfo | any) => void,

    value: string[]
}


export const UploadZone = ({diabled, onChange,  value}: UploadZoneProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
   setIsMounted(true)
    }, [])
    

   
    if (!isMounted) {
        return null
    }
    console.log(value)

 

    return (
        <>
        <div className="w-full flex flex-col space-y-3 items-center">
            <div className='flex items-center gap-x-2 overflow-x-auto'>
                   {value.map((url) => (
                <div key={url} className="relative w-96 h-48 overflow-hidden border rounded-md ">
                    <Button type="button" onClick={() => onChange('')}   variant='destructive' className="z-10 w-10 h-10 rounded-md absolute top-2 right-2 flex items-center ">
                        <Trash className="" />
                    </Button>
                    <Image src={url} alt="image" fill className="object-cover" />
                </div>
            ))}
            </div>
         
           <CldUploadWidget
           
  uploadPreset="odqnb24x"
  onSuccess={(result, { widget }) => {
    /** @ts-ignore */
    onChange(result?.info.secure_url);  // { public_id, secure_url, etc }
  }}
  onQueuesEnd={(result, { widget }) => {
        /** @ts-ignore */

   widget.close()  // { public_id, secure_url, etc }

  }}
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