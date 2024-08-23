"use client"

import { useWindowScroll } from "@uidotdev/usehooks"
import { cn } from "lib/utils"
import { HeaderContent } from "./HeaderContent"

export const Header = () => {
  const [{ y }] = useWindowScroll()

  return (
    <header
      className={cn(
        "fixed z-50 h-[var(--header-height)] w-full backdrop-blur-lg",
        y && y > 16 && "border-b",
      )}
    >
      <HeaderContent />
    </header>
  )
}
