import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { getQueryClient } from "components/getQueryClient"
import { getEvents } from "hooks/useEvents"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const Main = async ({ children }: Props) => {
  const client = getQueryClient()

  void client.prefetchQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <main className="mx-auto max-w-screen-md pt-[var(--header-height)]">
        {children}
      </main>
    </HydrationBoundary>
  )
}
