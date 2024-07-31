"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { getQueryClient } from "components/getQueryClient"
import type { ComponentProps } from "react"
import { isProd } from "utils/isProd"

type Props = {} & Omit<ComponentProps<typeof QueryClientProvider>, "client">

export const QueryProvider = ({ children, ...props }: Props) => {
  const client = getQueryClient()

  return (
    <QueryClientProvider {...props} client={client}>
      <ReactQueryStreamedHydration>
        {children}
        {/* {!isProd() && <ReactQueryDevtools initialIsOpen={false} />} */}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}
