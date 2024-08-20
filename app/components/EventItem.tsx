"use client"

import { AddToCalButton } from "app/components/AddToCalButton"
import { Image } from "components/Image"
import { Button } from "components/ui/button"
import { Toggle } from "components/ui/toggle"
import { format, parse } from "date-fns"
import type { Event } from "hooks/useEvents"
import { getUA } from "hooks/useLogging/useUA"
import { useSavedEvents } from "hooks/useSavedEvents"
import { highlight } from "hooks/useSearch"
import { Bookmark, Info, MapPin, Ticket, User } from "lucide-react"
import { useQueryState } from "nuqs"
import { toast } from "sonner"

type Props = {
  event: Event
}

export const EventItem = ({ event: e }: Props) => {
  const { isSaved, toggleEvent } = useSavedEvents()

  const [q] = useQueryState("q")

  const hasLink = e.link !== "TBD" && e.link

  return (
    <section className="relative m-0 flex cursor-default select-none gap-2 rounded-xl border bg-secondary/50 p-3 transition hover:border-accent-foreground/50">
      <div className="flex grow flex-col truncate">
        <time className="text-sm opacity-50 sm:text-base">
          {e.startTime === "00:00"
            ? `All Day`
            : e.startTime === "TBD"
              ? `TBD`
              : `${format(parse(e.startTime!, "HH:mm", new Date()), "h:mm a")}`}
        </time>
        <h2 className="my-1 text-balance font-medium text-lg leading-tight sm:text-xl">
          {highlight(e.title, q)}
        </h2>
        {e.host && (
          <div className="flex gap-1 text-xs sm:text-sm">
            <span className="opacity-50">by</span>
            <span className="flex-1 truncate opacity-70">
              {highlight(e.host, q)}
            </span>
          </div>
        )}
        <div className="h-4" />
        {e.type && e.type !== "TBD" && (
          <div className="flex h-6 items-center gap-1.5 sm:gap-2">
            <Info className="aspect-square size-3.5 opacity-50 sm:size-4" />
            <span className="flex-1 truncate text-sm opacity-50 sm:text-base">
              {highlight(e.type, q)}
            </span>
          </div>
        )}
        {e.location && e.location !== "TBD" ? (
          <Button
            variant="link"
            className="z-10 h-6 max-w-full justify-start gap-1.5 self-start px-0 py-0 text-foreground hover:no-underline sm:gap-2"
            asChild
          >
            <a
              href={
                e.placeId && getUA().type === "desktop"
                  ? `https://www.google.com/maps/place/?q=place_id:${e.placeId}`
                  : `https://www.google.com/maps/search/?api=1&query=${e.location}, ${e.address}`
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              <MapPin className="aspect-square size-3.5 min-h-3.5 min-w-3.5 opacity-50 hover:opacity-100 sm:size-4 sm:min-h-4 sm:min-w-4" />
              <span className="flex-1 truncate font-normal text-sm opacity-50 hover:opacity-100 sm:text-base">
                {highlight(e.location, q)}
              </span>
            </a>
          </Button>
        ) : (
          <div className="flex h-6 items-center gap-1.5 sm:gap-2">
            <MapPin className="aspect-square size-3.5 min-h-3.5 min-w-3.5 opacity-50 sm:size-4" />
            <span className="flex-1 truncate text-sm opacity-50 sm:text-base">
              {e.location ? highlight(e.location, q) : "TBD"}
            </span>
          </div>
        )}
        {e.entry && e.entry !== "TBD" && (
          <div className="flex h-6 items-center gap-1.5 sm:gap-2">
            <Ticket className="aspect-square size-3.5 opacity-50 sm:size-4" />
            <span className="flex-1 truncate text-sm opacity-50 sm:text-base">
              {highlight(e.entry, q)}
            </span>
          </div>
        )}
        {e.capacity && e.capacity !== "TBD" && (
          <div className="flex h-6 items-center gap-1.5 sm:gap-2">
            <User className="aspect-square size-3.5 opacity-50 sm:size-4" />
            <span className="flex-1 truncate font-mono text-sm opacity-50 sm:text-base">
              {e.capacity.replaceAll(" ", "")}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 sm:gap-4">
        <div className="flex">
          <div className="grow" />
          <AddToCalButton event={e} />
          {/* <Button
            size="icon"
            variant="ghost"
            className="size-6 opacity-50 hover:opacity-100 sm:size-8"
            >
            <Share className="size-4 sm:size-5" />
            </Button> */}
          <Button variant="ghost" className="z-10 hover:bg-transparent" asChild>
            <Toggle
              className="group size-6 p-0 sm:size-8"
              data-state={isSaved(e.id) ? "on" : "off"}
              onPressedChange={() => {
                toggleEvent(e.id)
                toast.success(!isSaved(e.id) ? `Saved` : `Removed`)
              }}
            >
              <Bookmark className="size-4 opacity-50 group-hover:opacity-100 group-data-[state=on]:fill-primary group-data-[state=on]:stroke-primary group-data-[state=on]:opacity-80 group-data-[state=on]:hover:opacity-100 sm:size-5" />
            </Toggle>
          </Button>
        </div>
        {e.image && (
          <Image
            className="aspect-square size-24 min-h-24 min-w-24 overflow-hidden rounded-lg object-cover sm:size-32 sm:min-h-32 sm:min-w-32"
            src={e.image}
            width={200}
            height={200}
            alt={e.title}
          />
        )}
      </div>

      <a
        href={hasLink ? e.link! : undefined}
        target={hasLink ? "_blank" : "_self"}
        className="absolute inset-0 h-full w-full"
        rel="noopener noreferrer"
        onClick={() => {
          if (!hasLink) {
            // Link is not provided yet
            toast.error("Link is not provided yet")
          }
        }}
      />
    </section>
  )
}
