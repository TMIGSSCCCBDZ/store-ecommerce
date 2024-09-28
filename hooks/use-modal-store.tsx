import { Billboard, Category, Color, Order, Product, Size, Store } from '@prisma/client'
import { create } from 'zustand'

type ModalType = "createSrore" | "deleteStore" | "deleteBillboard" | "deleteCategory" | "deleteSize" | "deleteColor" | "deleteProduct" | "deleteOrder"

interface ModalData {
    store?: Store
    billboard?: Billboard,
    category?: Category,
    size?: Size
    color?: Color
    product?:Product
    order?:Order
    storeId?: string,
    billboardId?: string
    categoryId?: string
    sizeId?: string
    colorId?:string
    productId?:string
    orderId?: string


}

interface ModalStore {

    type: ModalType | null,
    isOpen: boolean,
    data: {},
    onOpen: (type: ModalType, data?:ModalData) => void,
    onClose: () => void

}

export const useModal = create<ModalStore>(set => ({
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data={}) => set({isOpen: true, type, data}),
    onClose: () => set({isOpen: false, type: null})
}))