import { Button } from "components/ui/button"
import { Bookmark, Calendar, Info, Plus } from "lucide-react"

export const Header = () => {
  return (
    <header className="flex h-14 items-center px-2">
      <Button size="icon" variant="ghost">
        <Calendar className="size-4" />
      </Button>
      <div className="grow" />
      <Button size="icon" variant="ghost">
        <Info className="size-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Plus className="size-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Bookmark className="size-4" />
      </Button>
    </header>
  )
}
