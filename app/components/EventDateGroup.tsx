"use client"

import { map, pipe, sortBy, toArray } from "@fxts/core"
import { EventItem } from "app/components/EventItem"
import type { Event } from "hooks/useEvents"
import { DateChip } from "./DateChip"

type Props = {
  date: string
  events: Event[]
}

export const EventDateGroup = ({ date, events }: Props) => {
  return (
    <div key={date} className="flex flex-col gap-2 sm:flex-row">
      <DateChip date={date} />
      <div className="flex flex-1 flex-col gap-4 overflow-x-hidden">
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
