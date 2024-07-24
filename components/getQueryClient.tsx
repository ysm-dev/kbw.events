import {
  QueryClient,
  type QueryClientConfig,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query"
import { toast } from "sonner"

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 60 * 1000,
    },
    dehydrate: {
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
    },
    mutations: {
      onError: (e: any) => {
        const msg = e.shortMessage || e.details || e.name
        toast.error(msg)
      },
    },
  },
}

function makeQueryClient() {
  return new QueryClient(config)
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
