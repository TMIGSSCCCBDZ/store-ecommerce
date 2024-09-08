"use client"

import { useEffect, useState } from "react"
import { CreateStoreModal } from "../modals/create-store-modal";
import { DeleteStoreModal } from "../modals/delete-store";
import { DeleteBillboardModal } from "../modals/delete-billboard";
import { DeleteCategoryModal } from "../modals/delete-category";
import { DeleteSizeModal } from "../modals/delete-size";
import { DeleteColorModal } from "../modals/delete-color";
import { DeleteProductModal } from "../modals/delete-product";

export const ModalProvider = () => {
   const [isMounted, setisMounted] = useState(false)
   useEffect(() => {
    
   setisMounted(true)
   }, []);

   if (!isMounted) {
    return null
   }

    return (
        <>
        <CreateStoreModal />
        <DeleteStoreModal />
        <DeleteBillboardModal />
        <DeleteCategoryModal />
        <DeleteSizeModal />
        <DeleteColorModal />
        <DeleteProductModal />
        
        </>
    )
}