import { QueryProvider } from "components/QueryProvider"
import { ThemeProvider } from "components/ThemeProvider"
import { TooltipProvider } from "components/ui/tooltip"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
