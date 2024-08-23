"use client"

import { useIntersectionObserver } from "@uidotdev/usehooks"
import { format, parse } from "date-fns"
import { cn } from "lib/utils"

type Props = {
  date: string
}

export const DateChip = ({ date }: Props) => {
  const [ref, entry] = useIntersectionObserver({
    rootMargin: "-65px 0px 0px 0px",
  })

  const isPinned = !entry ? false : entry.intersectionRatio < 1

  return (
    <time
      ref={ref}
      className={cn(
        "sticky top-16 flex h-fit w-fit flex-row gap-2 rounded-full border p-1 px-2.5 text-base transition-all duration-300 ease-linear sm:min-w-28 sm:flex-col sm:gap-0 sm:p-0",
        isPinned &&
          "z-40 border-border bg-secondary/50 shadow-md backdrop-blur-lg sm:border-transparent sm:bg-transparent sm:shadow-none",
        !isPinned && "border-transparent",
      )}
    >
      <span>{format(parse(date, "yyyy-MM-dd", new Date()), "MMM d")}</span>
      <span className="opacity-50">
        {format(parse(date, "yyyy-MM-dd", new Date()), "EEEE")}
      </span>
    </time>
  )
}
