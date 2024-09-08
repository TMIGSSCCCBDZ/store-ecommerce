interface ToolTipContainerProps {
    children: React.ReactNode,
    label: string,
    side?: "top" | "right" | "bottom" | "left",
    align?: "center" | "end" | "start" 
}

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export const TooltipContainer = ({children, label, side, align}: ToolTipContainerProps) => {

    return (
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent side={side} align={align}>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
}