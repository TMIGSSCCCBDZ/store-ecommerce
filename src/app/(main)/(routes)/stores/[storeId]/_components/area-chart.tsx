"use client"

import { Percent, TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"


interface AreaChartProps {
    chartData: {month:string, price: number}[]
}

const chartConfig = {
  price: {
    label: "price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export const Component = ({chartData}: AreaChartProps) =>{
    const month = new Date().getMonth()
    const currentMonth = chartData[month].price 
    const PreviousMonth = chartData[month -1].price 
 const trendingPrice = (currentMonth && PreviousMonth) ? currentMonth > PreviousMonth ? (((currentMonth - PreviousMonth) / PreviousMonth )* 100) : (((currentMonth - PreviousMonth) / PreviousMonth )* 100) : 0

    const variant = trendingPrice > 0 ? true : false
    const zeroVariant = trendingPrice === 0 ? true : false
    
  return (
    <Card className="mx-auto md:w-1/2">
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="price" fill="var(--color-price)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
            {zeroVariant ? (<div className="text-zinc-400">
               {!PreviousMonth || !currentMonth ? ('No enough data ') : ('The business on the same level')}
            </div>) : (<>{variant ? (<div className="text-emerald-500">
                there is an increase in the business by {trendingPrice} <Percent className="w-4 h-4" />
                <TrendingUp className="h-4 w-4" />
            </div>) : (<div className="text-destructive">
                there is an decline in the business by {Math.abs(trendingPrice)} <Percent className="w-4 h-4" />
                <TrendingDown className="h-4 w-4" />
            </div>)}</>)}
            
 
        </div>
       
      </CardFooter>
    </Card>
  )
}
