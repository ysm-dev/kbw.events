import { Button } from "components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip"
import { Bookmark, Calendar, Info, Plus, Sun } from "lucide-react"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="fixed z-50 flex h-[var(--header-height)] w-full items-center px-2 backdrop-blur-lg">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" asChild>
            <Link href="/">
              <Calendar className="size-4 opacity-50" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-foreground" collisionPadding={8}>
          Discover Events
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" className="relative" asChild>
            <Link href="/saved">
              <Bookmark className="size-4 opacity-50" />
              <div className="absolute top-0 right-0 m-2 size-[9px] rounded-full bg-gradient-to-r from-red-400 to-red-500 shadow-sm" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-foreground" collisionPadding={8}>
          Saved Events
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" asChild>
            <Link href="/about">
              <Info className="size-4 opacity-50" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-foreground">About</TooltipContent>
      </Tooltip>

      <div className="grow" />

      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost">
            <Sun className="size-4 opacity-70" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-foreground" collisionPadding={8}>
          Toggle Appearance
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" asChild>
            <a
              href={`https://jlqcur2qr3i.typeform.com/to/fsgxiUno`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Plus className="size-4 opacity-70" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-foreground">Submit Event</TooltipContent>
      </Tooltip>
    </header>
  )
}
