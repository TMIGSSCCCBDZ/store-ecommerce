import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export const POST = async(req: Request) => {
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string
    try {
            const event: Stripe.Event  = stripe.webhooks.constructEvent(
                body, 
                signature,
                process.env.STRIPE_WEBHOOK_SECRET as string
            )
            const session = event.data.object as Stripe.Checkout.Session 
            const address = session.customer_details?.address
            const addressArray = [
                address?.line1,
                address?.line2,
                address?.city,
                address?.state,
                address?.country
            ]
            const addressString = addressArray.filter(address => address !== null).join(", ")
            const phone = session.customer_details?.phone
        
            if (event.type === "checkout.session.completed") {
                const orders = await db.order.update({
                    where:{
                        id: session?.metadata?.orderId
                    },data:{
                        isPaid: true,
                        phone: phone as string,
                        address: addressString
    
    
                    },
                    include:{
                        orderItems: true
                    }
                })
                const prodcutIds = orders.orderItems.map(item => item.productId)
                 await db.product.updateMany({
                    where:{
                        id:{
                            in: prodcutIds
                        }
                    },
                    data:{
                        isArchived: true
                    }
                })

                
            }
            return new NextResponse("success", {status: 200})

    } catch (error) {
        
    }
}