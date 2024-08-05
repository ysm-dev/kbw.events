import { indexBy, map, pipe, values } from "@fxts/core"
import { useSuspenseQuery } from "@tanstack/react-query"
import ms from "ms"
import { slugify } from "utils/slugify"

export const getEvents = async () => {
  const data = await fetch(
    "https://raw.githubusercontent.com/ysm-dev/kbw.events/2024/public/data.json",
    {
      next: {
        revalidate: ms("1h"),
      },
    },
  ).then<R>((r) => r.json())

  return pipe(
    data,
    values,
    map((v) => ({ ...v, id: slugify(v.title) })),
    indexBy((e) => e.id),
  )
}

export const useEvents = () => {
  return useSuspenseQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })
}

type R = {
  [key in string]: Event
}

export type Event = {
  image: string | null
  title: string
  id: string
  host: string | null
  startDate: string | null
  endDate: string | null
  startTime: string | null
  endTime: string | null
  type: string | null
  location: string | null
  address: string | null
  placeId: string | null
  entry: string | null
  link: string | null
  capacity: string | null
  email: string | null
}
