import { useLocalStorage } from "@uidotdev/usehooks"

export const useSavedEvents = () => {
  const [saved, setSaved] = useLocalStorage<string[]>("saved", [])

  const r = {
    saved,
    setSaved,
    addEvent: (id: string) => {
      setSaved([...saved, id])
    },
    removeEvent: (id: string) => {
      setSaved(saved.filter((savedId) => savedId !== id))
    },
    toggleEvent: (id: string) => {
      if (r.isSaved(id)) {
        r.removeEvent(id)
      } else {
        r.addEvent(id)
      }
    },
    isSaved: (id: string) => {
      return saved.includes(id)
    },
  }

  return r
}
