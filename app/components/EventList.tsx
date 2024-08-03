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
import { useEffect } from "react"
import { useMiniSearch } from "react-minisearch"

export const EventList = () => {
  const { data: events } = useEvents()

  const [q] = useQueryState("q")

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
    search(q)
  }, [q, search])

  return (
    <div className="mt-8 flex flex-col gap-8">
      {pipe(
        events,
        values,
        filter((e) => e.startDate),
        filter((e) =>
          searchResults
            ? searchResults.map(({ id }) => id).includes(e.id)
            : true,
        ),
        groupBy((e) => e.startDate),
        entries,
        sortBy(([date]) => date),
        map(([date, events]) => (
          <EventDateGroup key={date} date={date} events={events} />
        )),
        toArray,
        (r) =>
          r.length === 0 && q ? (
            <div className="my-16">
              <h3 className="text-center text-lg sm:text-2xl">
                No results found.
              </h3>
            </div>
          ) : (
            <>{r}</>
          ),
      )}
    </div>
  )
}
