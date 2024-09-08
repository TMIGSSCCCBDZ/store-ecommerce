interface StoreSwitcherProps {
    stores: Store[]
}
"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown,  Plus,  StoreIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useParams } from "next/navigation"
import { Store } from "@prisma/client"
import { useRouter } from "next/navigation"
import { CommandSeparator } from "cmdk"
import { useModal } from "../../../../../../../hooks/use-modal-store"
 
export const StoreSwitcher = ({stores}: StoreSwitcherProps) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const params = useParams()
    const router = useRouter()
    const storeId = params.storeId
    const {onOpen} = useModal()
    return (
        <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {storeId
            ? (
                <div className="flex items-center gap-x-2">
                    <StoreIcon className="w-4 h-4" />
                    {stores.find((store) => store.id === storeId)?.name}

                </div>
            )
            : (
                <div className="flex items-center gap-x-2">
                    <StoreIcon className="w-4 h-4" />
                    Choose store
                </div>
            )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {stores.map((store) => (
                <CommandItem
                  key={store.id}
                  value={store.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                   router.push(`/stores/${store.id}`)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      storeId === store.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {store.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            
            <CommandGroup>
            
                <CommandItem 
                  key={'create'}
                  value={'create store'}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)

                  onOpen('createSrore')
                    setOpen(false)
                  }}
                >
                <Plus
                    className={cn(
                      "mr-2 h-4 w-4"
                  
                    )}
                  />
                  Create Store
                  
                </CommandItem>
            
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    )
}