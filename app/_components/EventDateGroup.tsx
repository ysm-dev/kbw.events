"use client"

import {
  entries,
  filter,
  groupBy,
  map,
  pipe,
  sortBy,
  toArray,
  values,
} from "@fxts/core"
import { useIntersectionObserver } from "@uidotdev/usehooks"
import { EventItem } from "app/_components/EventItem"
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
    <div key={date}>
      <time
        ref={ref}
        className={cn(
          "sticky top-16 flex w-fit gap-2 rounded-full p-1 px-2.5 text-base",
          isPinned &&
            "z-40 bg-background/65 shadow-md outline outline-border backdrop-blur-lg",
        )}
      >
        <span>{format(parse(date, "yyyy-MM-dd", new Date()), "MMM d")}</span>
        <span className="opacity-50">
          {format(parse(date, "yyyy-MM-dd", new Date()), "EEEE")}
        </span>
      </time>
      <div className="mt-4 flex flex-col gap-4">
        {pipe(
          events,
          sortBy((e) => e.startTime),
          map((e) => <EventItem key={e.slug} event={e} />),
          toArray,
        )}
      </div>
    </div>
  )
}
