import { useEvents } from "hooks/useEvents"
import { useMiniSearch } from "react-minisearch"

export const useSearch = () => {
  const { data: events } = useEvents()

  return useMiniSearch(Object.values(events), {
    fields: ["title", "host", "location", "address", "type", "entry"],
  })
}

export const highlight = (text: string, term?: string | null) => {
  if (!term?.trim()) return text

  const regex = new RegExp(`(${term})`, "gi")

  return text
    .split(regex)
    .map((part, index) =>
      regex.test(part) ? <mark key={index}>{part}</mark> : part,
    )
}
