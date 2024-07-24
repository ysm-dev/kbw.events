import { QueryProvider } from "components/QueryProvider"
import { TooltipProvider } from "components/ui/tooltip"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryProvider>
  )
}
