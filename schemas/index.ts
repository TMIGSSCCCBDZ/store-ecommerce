import { z } from "zod";

export const createStoreSchema = z.object({
    name: z.string().min(2,{
        message:'just a little more characters'
    })
})