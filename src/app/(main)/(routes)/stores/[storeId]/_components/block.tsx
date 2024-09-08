"use client"

import { Bar, BarChart, Rectangle, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Currency, DollarSign } from "lucide-react"
interface ComponentProps {
    title: string,
    number: number,
    type: string
}
export const Block = ({title, number, type}: ComponentProps) =>{
  return (
    <Card className="max-w-xs">
      <CardHeader className="p-4 pb-0">
        <CardDescription className="text-2xl">{title}</CardDescription>
      
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
        <div className="flex items-center gap-2 text-2xl  tabular-nums leading-none">
          {number}
          <span className="text-sm font-normal text-muted-foreground">
            {type === 'profit' && ( <DollarSign />)}
           
          </span>
        </div>
    
      </CardContent>
    </Card>
  )
}
