"use client"

import { map, pipe, sortBy, toArray } from "@fxts/core"
import { useIntersectionObserver } from "@uidotdev/usehooks"
import { EventItem } from "app/components/EventItem"
import { format, parse } from "date-fns"
import type { Event } from "hooks/useEvents"
import { cn } from "lib/utils"

type Props = {
  date: string
  events: Event[]
}

export const EventDateGroup = ({ date, events }: Props) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: [1],
    rootMargin: "-65px 0px 0px 0px",
  })

  const isPinned = !entry ? false : entry.intersectionRatio < 1

  return (
    <div key={date} className="flex flex-col gap-2 sm:flex-row">
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
      <div className="flex flex-1 flex-col gap-4">
        {pipe(
          events,
          sortBy((e) => e.startTime),
          map((e) => <EventItem key={e.id} event={e} />),
          toArray,
        )}
      </div>
    </div>
  )
}
