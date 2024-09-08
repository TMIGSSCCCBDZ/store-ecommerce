interface AlertApiProps {
    title: string, 
    description: string,
    variant: "public" | "admin"
} 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Check, Copy, Server } from "lucide-react"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import { useState } from "react"


export const AlertApi = ({title, description, variant}: AlertApiProps) => {
  const [isCopied, setIsCopied] = useState(false);

    const textMap = {
        public: "public",
        admin: "admin",
    }
    const variantMap: Record<AlertApiProps['variant'], BadgeProps['variant']> = {
        public: 'default',
        admin: "destructive"
    }

    const onCopy = () => {
      setIsCopied(true)
      navigator.clipboard.writeText(description)
      toast({
        variant:"default",
        title:'Success',
        description:"copied to clipboard."
      })
      setTimeout(() => {
        setIsCopied(false)
      }, 500);
    }

    return(
        <Alert >
      <Server className="h-4 w-4" />
      <AlertTitle>{title}
      <Badge className="ml-2" variant={variantMap[variant]}>
        {textMap[variant]}
      </Badge>
      </AlertTitle>
      <AlertDescription className="mt-2">
        <code className=" bg-muted-foreground/10 p-1 rounded-md text-sm font-mono font-semibold  break-words  ">
{description}
    </code>
    <Button className="mt-1" variant={'outline'} size={'icon'} onClick={onCopy}>
     {isCopied ? ( <Check className="w-4 h-4" />) : ( <Copy className="w-4 h-4" />)}
    </Button>
      </AlertDescription>
    </Alert>
    )
}