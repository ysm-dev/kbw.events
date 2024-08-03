"use client"

import { useWindowScroll } from "@uidotdev/usehooks"
import { Search } from "app/components/Search"
import { Button } from "components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip"
import { useSavedEvents } from "hooks/useSavedEvents"
import { cn } from "lib/utils"
import { Bookmark, Compass, Info, Moon, Plus, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export const Header = () => {
  const { saved } = useSavedEvents()
  const [{ y }] = useWindowScroll()

  const { setTheme, resolvedTheme } = useTheme()

  return (
    <header
      className={cn(
        "fixed z-50 h-[var(--header-height)] w-full backdrop-blur-lg",
        y && y > 16 && "border-b",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-screen-md items-center px-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" asChild>
              <Link href="/" className="opacity-50 hover:opacity-100">
                <Compass className="size-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-foreground" collisionPadding={8}>
            Discover
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" className="relative" asChild>
              <Link href="/saved" className="group">
                <Bookmark className="size-4 opacity-50 group-hover:opacity-100" />
                <div
                  className={cn(
                    "absolute top-0 right-0 m-2 size-2 rounded-full bg-gradient-to-r from-red-400 to-red-500 shadow-sm transition-all",
                    saved.length === 0 && "opacity-0",
                  )}
                />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-foreground" collisionPadding={8}>
            Saved Events
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="opacity-50 hover:opacity-100"
              asChild
            >
              <Link href="/about">
                <Info className="size-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-foreground">About</TooltipContent>
        </Tooltip>

        <div className="grow" />

        <Search />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="opacity-50 hover:opacity-100"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="aspect-square size-4" />
              ) : (
                <Moon className="aspect-square size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-foreground" collisionPadding={8}>
            {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="opacity-50 hover:opacity-100"
              asChild
            >
              <a
                href={`https://jlqcur2qr3i.typeform.com/to/fsgxiUno`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Plus className="size-4" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-foreground" collisionPadding={8}>
            Submit Event
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}
