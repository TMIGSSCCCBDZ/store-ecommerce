import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import Stripe from "stripe"


const corsHeaders = {
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
"Access-Control-Allow-Headers": "Content-Type, Authorization",
"Access-Control-Allow-Credentials": "true"
}

export const OPTIONS = async() => {
    return NextResponse.json({},{headers: corsHeaders})
}

export const POST = async(req: Request, {params}:{params:{storeId: string}}) => {
    try {
        const storeId = params.storeId
        const {productIds}  = await req.json()
        console.log(storeId, productIds)
        if (!storeId) {
            return new NextResponse("store id not found",{status: 400})
        }
        if (!productIds || productIds.length === 0) {
            return new NextResponse("product ids not found",{status: 400})
        }
        const store = await db.store.findUnique({
            where:{
                id: storeId
            }
        })
        if (!store) {
            return new NextResponse("store not found",{status: 404})
        }
        const products = await db.product.findMany({
            where:{
                id:{
                    in: productIds
                }
            }
        })
    
        
        const line_items:  Stripe.Checkout.SessionCreateParams.LineItem[] = []
        products.forEach(product=> {
            line_items.push({
                quantity:1,
                price_data:{
                    currency:"usd",
                    product_data:{
                        name: product.name
                    },
                    unit_amount: product.price.toNumber() * 100
                }
            })
        })
        const order = await db.order.create({
            data:{
                 storeId,
                 isPaid: false,
                 orderItems:{
                    create: productIds.map((id: string)=>({
                        product:{
                            connect:{
                                id: id
                            }
                        }
                    }))
                 }

            }
        })
        const checkoutSession=
        await stripe.checkout.sessions.create({
            line_items,
            mode:"payment",
            billing_address_collection:"required",
            phone_number_collection:{
                enabled: true
            },
            success_url: `${process.env.FRONT_END_STORE}?success=1`,
            cancel_url: `${process.env.FRONT_END_STORE}?cancel=1`,
          metadata:{
            orderId: order.id
          }
        });
     

        return NextResponse.json({url: checkoutSession.url},{headers:corsHeaders})
        
    } catch (error) {
        return new NextResponse("[ERROR DOING THE PAYMEN]" + error, {status: 500})
    }

}





/**
 * 
 * import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"



const corsHeaders = {
   "Access-Control-Allow-Origin":"*",
"Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
"Access-Control-Allow-Headers":"Content-Type, Authorization"

}

export const OPTIONS = () => {
    return NextResponse.json({},{headers: corsHeaders})
}


export const POST = async(req:Request, {params}:{params:{storeId: string}}) => {

    try {
        const storeId = params.storeId
        const {productIds} = await req.json()
        if (!storeId) {
            return new NextResponse("store id not found",{status:400})
        }
        if (!productIds || productIds.length === 0) {
            return new NextResponse("product id not found",{status:400})
        }
        const store = await db.store.findUnique({
            where:{
                id: storeId
            }
        })
        if (!store) {
            return new NextResponse("store not found",{status:404})
        }
        const products = await db.product.findMany({
            where:{
                id:{
                    in: productIds
                }
            }
        })
        const line_items : Stripe.Checkout.SessionCreateParams.LineItem[] = []
        products.forEach(product => {
            line_items.push({
                quantity:1,
                price_data:{
                    currency:"usd",
                    product_data:{
                        name: product.name
                    },
                    unit_amount: product.price.toNumber()
                }
                
            })

        })

        const order = await db.order.create({
            data:{
                storeId,
                isPaid: false,
                orderItems:{
                    create: productIds.map((id: string)=>({
                        product: {
                            connect: {
                                id: id
                            }
                        }
                    }))
                }
            }
        })
        const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
            line_items,
            mode:"payment",
            billing_address_collection: 'required',
            phone_number_collection:{
                enabled: true
            },
            success_url: `${process.env.FRONT_END_STORE}/?success=1`,
            cancel_url: `${process.env.FRONT_END_STORE}/?cancel=1`,
            metadata:{
                orderId: order.id
            }
          
        });
        return NextResponse.json({url: checkoutSession.url},{
            headers: corsHeaders
        })
    } catch (error) {
        
    }

}




 */