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
import { IconCalendarSad } from "@tabler/icons-react"
import { EventDateGroup } from "app/_components/EventDateGroup"
import { Button } from "components/ui/button"
import { useEvents } from "hooks/useEvents"
import { useSavedEvents } from "hooks/useSavedEvents"
import { Compass } from "lucide-react"
import Link from "next/link"

export default function Page() {
  const { saved } = useSavedEvents()

  const { data: events } = useEvents()

  const savedEvents = pipe(
    events,
    values,
    filter((e) => saved.includes(e.slug)),
    toArray,
  )

  return (
    <div id="saved" className="m-2 p-2 text-2xl">
      <h1 className="text-left font-extrabold text-2xl">Saved Events</h1>
      {savedEvents.length === 0 ? (
        <section className="mt-20 flex flex-col items-center justify-center space-y-4">
          <IconCalendarSad className="size-40 stroke-1" />
          <span className="text-lg">No Saved Events</span>
          <span className="!mt-1 max-w-sm text-balance text-center text-base opacity-50">
            You haven't saved any events yet. Discover events to save them here.
          </span>
          <Button
            asChild
            className="!mt-12 gap-1.5 font-semibold"
            variant="secondary"
          >
            <Link href="/">
              <Compass className="size-5" />
              Discover Events
            </Link>
          </Button>
        </section>
      ) : (
        <section className="flex flex-col gap-4 py-4">
          {pipe(
            savedEvents,
            filter((e) => e.startDate),
            groupBy((e) => e.startDate),
            entries,
            sortBy(([date]) => date),
            map(([date, events]) => (
              <EventDateGroup key={date} date={date} events={events} />
            )),
            toArray,
          )}
        </section>
      )}
    </div>
  )
}
