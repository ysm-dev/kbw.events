"use client"

import {
  IconBrandAppleFilled,
  IconBrandGoogleFilled,
} from "@tabler/icons-react"
import { google, ics } from "calendar-link"
import {
  DrawerDialog,
  DrawerDialogContent,
  DrawerDialogTrigger,
} from "components/DrawerDialog"
import { Button } from "components/ui/button"
import { parse } from "date-fns"
import type { Event } from "hooks/useEvents"
import { CalendarPlus } from "lucide-react"

type Props = {
  event: Event
}

export const AddToCalButton = ({ event: e }: Props) => {
  const cal = {
    title: e.title,
    description: [
      e.host ? `Host: ${e.host}` : undefined,
      e.type ? `Type: ${e.type}` : undefined,
      e.address ? `Address: ${e.address}` : undefined,
      e.entry ? `Entry: ${e.entry}` : undefined,
      e.capacity ? `Capacity: ${e.capacity}` : undefined,
    ].join("\n\n"),
    allDay: e.startTime === "00:00" || e.startTime === "TBD",
    start: parse(
      `${e.startDate} ${e.startTime}`,
      "yyyy-MM-dd HH:mm",
      new Date(),
    ).toISOString(),
    end: parse(
      `${e.endDate} ${e.endTime}`,
      "yyyy-MM-dd HH:mm",
      new Date(),
    ).toISOString(),
    location: e.location || undefined,
    url: e.link || undefined,
  }

  return (
    <DrawerDialog
    //
    // open={e.title.includes("Tech&Talk")}
    >
      <DrawerDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="z-10 size-6 opacity-50 hover:opacity-100 sm:size-8"
        >
          <CalendarPlus className="size-4 sm:size-5" />
        </Button>
      </DrawerDialogTrigger>
      <DrawerDialogContent className="z-50 outline-none sm:max-w-80">
        <div className="flex flex-col gap-4 p-4 sm:p-0">
          <h3 className="font-semibold text-xl sm:text-lg">Add to Calendar</h3>
          <Button
            variant="outline"
            className="gap-1.5 font-semibold text-base"
            size="lg"
            asChild
          >
            <a href={google(cal)} target="_blank" rel="noreferrer noopener">
              <IconBrandGoogleFilled className="size-4" />
              Google Calendar
            </a>
          </Button>
          <Button
            variant="outline"
            className="gap-1.5 font-semibold text-base"
            size="lg"
            asChild
          >
            <a href={ics(cal)} target="_blank" rel="noreferrer noopener">
              <IconBrandAppleFilled className="size-4" />
              iCal (Apple / Outlook)
            </a>
          </Button>
        </div>
      </DrawerDialogContent>
    </DrawerDialog>
  )
}
