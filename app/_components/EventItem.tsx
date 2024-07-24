"use client"

import { Image } from "components/Image"
import { Button } from "components/ui/button"
import { Toggle } from "components/ui/toggle"
import type { Event } from "hooks/useEvents"
import { useSavedEvents } from "hooks/useSavedEvents"
import { Bookmark, Info, MapPin, Share, Ticket, User } from "lucide-react"
import { toast } from "sonner"

type Props = {
  event: Event
}

export const EventItem = ({ event: e }: Props) => {
  const { isSaved, toggleEvent } = useSavedEvents()

  return (
    <article key={e.title} className="flex gap-4 rounded-xl border p-2">
      <div className="flex flex-1 flex-col overflow-hidden">
        <time className="text-sm opacity-50">
          {e.startTime === "00:00"
            ? `All Day`
            : `${e.startTime} - ${e.endTime}`}
        </time>
        <h2 className="my-1 text-balance font-medium text-lg leading-tight">
          {e.title}
        </h2>
        {e.host && (
          <div className="flex gap-1 overflow-hidden">
            <span className="text-xs opacity-50">by</span>
            <span className="line-clamp-1 text-wrap text-xs opacity-70">
              {e.host}
            </span>
          </div>
        )}
        <div className="h-4" />
        {e.type && e.type !== "TBD" && (
          <div className="flex h-6 items-center gap-1.5">
            <Info className="aspect-square size-3.5" />
            <span className="flex-1 truncate font-mono text-sm opacity-50">
              {e.type}
            </span>
          </div>
        )}
        {e.location !== "TBD" ? (
          <Button
            asChild
            variant="link"
            className="h-6 w-full justify-start gap-1.5 self-start px-0 py-0 text-foreground"
          >
            <a
              href={
                e.placeId
                  ? `https://www.google.com/maps/place/?q=place_id:${e.placeId}`
                  : `https://www.google.com/maps/search/?api=1&query=${e.location}, ${e.address}`
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              <MapPin className="aspect-square size-3.5" />
              <span className="truncate text-sm opacity-50">{e.location}</span>
            </a>
          </Button>
        ) : (
          <div className="flex h-6 items-center gap-1.5">
            <MapPin className="aspect-square size-3.5" />
            <span className="truncate text-sm opacity-50">{e.location}</span>
          </div>
        )}
        {e.entry && e.entry !== "TBD" && (
          <div className="flex h-6 items-center gap-1.5">
            <Ticket className="aspect-square size-3.5" />
            <span className="flex-1 truncate font-mono text-sm opacity-50">
              {e.entry}
            </span>
          </div>
        )}
        {e.capacity && e.capacity !== "TBD" && (
          <div className="flex h-6 items-center gap-1.5">
            <User className="aspect-square size-3.5" />
            <span className="truncate font-mono text-sm opacity-50">
              {e.capacity.replaceAll(" ", "")}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="grow" />
          <Button
            size="icon"
            variant="outline"
            className="-mr-0.5 -mt-0.5 size-6"
          >
            <Share className="size-4" />
          </Button>
          <Toggle
            variant="outline"
            className="group -mr-0.5 -mt-0.5 size-6 p-0"
            data-state={isSaved(e.slug) ? "on" : "off"}
            onPressedChange={() => {
              toggleEvent(e.slug)
              toast.success(
                !isSaved(e.slug) ? `Saved ${e.title}` : `Removed ${e.title}`,
              )
            }}
          >
            <Bookmark className="size-4 group-data-[state=on]:fill-foreground" />
          </Toggle>
        </div>
        {e.image && (
          <Image
            className="aspect-square size-24 overflow-hidden rounded-lg object-cover sm:size-30"
            src={e.image}
            width={200}
            height={200}
            alt={e.title}
          />
        )}
      </div>
    </article>
  )
}
