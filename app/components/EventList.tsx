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
import { useQueryState } from "nuqs"
import { startTransition, useDeferredValue, useEffect, useMemo } from "react"
import { useMiniSearch } from "react-minisearch"

export const EventList = () => {
  const { data: events } = useEvents()

  const [q] = useQueryState("q")

  const deferredQ = useDeferredValue(q)

  const { searchResults, search, clearSearch } = useMiniSearch(
    Object.values(events),
    {
      fields: ["title", "host", "location", "type", "entry"],
      storeFields: ["title", "host", "location", "type", "entry"],
      searchOptions: {
        prefix: true,
        // fuzzy: true,
      },
    },
  )

  useEffect(() => {
    if (!q) {
      clearSearch()
      return
    }
    startTransition(() => {
      search(q)
    })
  }, [q, search])

  const filteredEvents = useMemo(() => {
    return pipe(
      events,
      values,
      filter((e) => e.startDate),
      filter((e) =>
        searchResults ? searchResults.map(({ id }) => id).includes(e.id) : true,
      ),
      toArray,
    )
  }, [deferredQ])

  const hasResults = filteredEvents.length > 0

  return (
    <div className="">
      <div className="my-8 flex justify-end gap-1 text-sm sm:text-base">
        <span className="font-mono">{filteredEvents.length}</span>
        <span>Events</span>
      </div>
      <div className="flex flex-col gap-8">
        {!hasResults ? (
          <div className="my-16">
            <h3 className="text-center text-lg sm:text-2xl">
              No results found.
            </h3>
          </div>
        ) : (
          pipe(
            filteredEvents,
            groupBy((e) => e.startDate),
            entries,
            sortBy(([date]) => date),
            map(([date, events]) => (
              <EventDateGroup key={date} date={date} events={events} />
            )),
            toArray,
          )
        )}
      </div>
    </div>
  )
}
