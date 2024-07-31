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
import { EventDateGroup } from "app/components/EventDateGroup"
import { useEvents } from "hooks/useEvents"

export const EventList = () => {
  const { data: events } = useEvents()

  return (
    <div className="mt-8 flex flex-col gap-8">
      {pipe(
        events,
        values,
        filter((e) => e.startDate),
        groupBy((e) => e.startDate),
        entries,
        sortBy(([date]) => date),
        map(([date, events]) => (
          <EventDateGroup key={date} date={date} events={events} />
        )),
        toArray,
      )}
    </div>
  )
}
