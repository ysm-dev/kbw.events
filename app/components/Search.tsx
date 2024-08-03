"use client"

import { useToggle } from "@uidotdev/usehooks"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip"
import { cn } from "lib/utils"
import { Search as SearchIcon, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useQueryState } from "nuqs"

export const Search = () => {
  const [on, toggle] = useToggle()
  const [q, setQ] = useQueryState("q")
  const { push } = useRouter()
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <Tooltip>
      <TooltipTrigger asChild className={cn(!isHome && "hidden")}>
        {!on ? (
          <Button
            size="icon"
            variant="ghost"
            className="opacity-50 hover:opacity-100"
            onClick={() => {
              push("/")

              toggle(true)
            }}
          >
            <SearchIcon className="aspect-square size-4" />
          </Button>
        ) : (
          <div className="relative">
            <SearchIcon className="absolute mx-2 my-auto aspect-square size-4 h-full opacity-50" />
            <Input
              className="h-8 w-32 rounded-full px-7 transition sm:w-40"
              value={q || ""}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setQ("")
                  toggle(false)
                }
              }}
            />
            <X
              className="-translate-y-1/2 absolute top-1/2 right-0 aspect-square size-8 p-2 opacity-50 hover:opacity-100"
              onClick={() => {
                setQ("")
                toggle(false)
              }}
            />
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent
        className={cn("bg-foreground", on && "hidden")}
        collisionPadding={8}
      >
        Search
      </TooltipContent>
    </Tooltip>
  )
}
