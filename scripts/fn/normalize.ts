import { join } from "node:path"
import {
  concurrent,
  entries,
  indexBy,
  map,
  pipe,
  toArray,
  toAsync,
} from "@fxts/core"
import { format } from "date-fns"
import { parse } from "date-format-parse"
import ogs from "open-graph-scraper"
import { getLumaInfo } from "scripts/fn/getLumaInfo"
import { isLumaPage } from "utils/isLumaPage"
import { isURL } from "utils/isURL"
import { saveImage } from "utils/saveImage"

export const normalize = async (data: (string | undefined)[][]) => {
  const a = [data[4], data[5], ...data.slice(7)]

  const r = await pipe(
    a,
    toAsync,
    map(norm),
    concurrent(20),
    toArray,
    indexBy((i) => i.title),
  )

  console.log(r)

  return r
}

const norm = async (
  row: (string | undefined)[],
): Promise<{ [key in string]: string | null }> => {
  const image = await getImage(row)
  const title = getTitle(row)
  const host = getHost(row)
  const type = getType(row)
  const location = getLocation(row)
  const address = getAddress(row)
  const placeId = await getPlaceId(row)
  const entry = getEntry(row)
  const link = getLink(row)
  const capacity = getCapacity(row)
  const email = getEmail(row)
  const startDate = getStartDate(row)
  const endDate = getEndDate(row)
  const startTime = getStartTime(row)
  const endTime = getEndTime(row)

  const r = {
    image,
    title,
    host,
    startDate,
    endDate,
    startTime,
    endTime,
    type,
    location,
    address,
    placeId,
    entry,
    link,
    capacity,
    email,
  }

  return pipe(
    r,
    entries,
    map(([k, v]) => [k, v?.replaceAll("\r", "").trim() ?? null]),
    Object.fromEntries,
  )
}

const getImage = async (
  row: (string | undefined)[],
): Promise<string | null> => {
  const link = getLink(row)

  if (isURL(link)) {
    if (isLumaPage(link)) {
      const id = new URL(link).pathname.split("/")[1]
      const luma = await getLumaInfo(id)

      if (!luma) {
        return null
      }

      const event = luma.event

      if (isURL(event?.cover_url)) {
        return await saveImage(event.cover_url)
      }

      return null
    }

    const r = await ogs({ url: link }).catch(() => null)

    if (!r) {
      return null
    }

    const url = r.result.ogImage?.[0].url

    if (url && !url.startsWith("http")) {
      const uri = new URL(url, link).toString()

      return await saveImage(uri)
    }

    if (isURL(url)) {
      return await saveImage(url)
    }
  }

  return null
}

const getTitle = (row: (string | undefined)[]): string => {
  if (!row[1] || !row[1].split("\n")[0]) {
    throw new Error("Title is required")
  }

  return row[1].split("\n")[0]
}

const getHost = (row: (string | undefined)[]): string | null => {
  if (!row[1]) return null
  if (row[1] === "N/A") return null

  return row[1]?.split("\n")?.[1] || null
}

const getType = (row: (string | undefined)[]): string | null => {
  if (!row[3]) return null
  if (row[3].includes("TBD")) return "TBD"

  return row[3].replaceAll("\n", " ") || null
}

const getLocation = (row: (string | undefined)[]): string | null => {
  if (!row[4]) return null
  if (row[4].includes("TBD")) return "TBD"

  return row[4]?.split("\n")?.[0] || null
}

const getAddress = (row: (string | undefined)[]): string | null => {
  if (!row[4]) return null
  if (row[4].includes("TBD")) return "TBD"

  return row[4]?.split("\n")?.[1] || null
}

const getPlaceId = async (
  row: (string | undefined)[],
): Promise<string | null> => {
  const link = getLink(row)

  if (isURL(link) && isLumaPage(link)) {
    const id = new URL(link).pathname.split("/")[1]
    const luma = await getLumaInfo(id)

    if (!luma) {
      return null
    }

    return luma.event?.geo_address_info?.place_id || null
  }

  return null
}

const getEntry = (row: (string | undefined)[]): string | null => {
  if (!row[5]) return null
  if (row[5].includes("TBD")) return "TBD"

  return row[5].replaceAll("\n", " ").replaceAll("  ", " ")
}

const getLink = (row: (string | undefined)[]): string | null => {
  if (!row[6]) return null
  if (row[6].includes("TBD")) return "TBD"

  return row[6] || null
}

const getCapacity = (row: (string | undefined)[]): string | null => {
  if (!row[7]) return null
  if (row[7].includes("N/A")) return null
  if (row[7].includes("TBD")) return "TBD"

  return row[7] || null
}

const getEmail = (row: (string | undefined)[]): string | null => {
  if (!row[8]) return null
  if (row[8].includes("TBD")) return "TBD"

  return (
    row[8]
      .replaceAll("\n", ",")
      .replaceAll("mailto:", "")
      .split(",")
      .filter((e) => e.includes("@"))?.[0] || null
  )
}

const getStartDate = (row: (string | undefined)[]): string | null => {
  if (!row[0]) return null
  if (row[0].includes("TBD")) return "TBD"

  return format(parse(row[0].split(" - ")[0], "MMM D"), "yyyy-MM-dd") || null
}

const getEndDate = (row: (string | undefined)[]): string | null => {
  if (!row[0]) return null
  if (row[0].includes("TBD")) return "TBD"

  return (
    format(
      parse(row[0].split(" - ")?.[1] ?? row[0].split(" - ")?.[0], "MMM D"),
      "yyyy-MM-dd",
    ) || null
  )
}

const getStartTime = (row: (string | undefined)[]): string | null => {
  if (!row[2]) return null
  if (row[2].includes("TBD")) return "00:00"
  if (row[2].includes("All Day")) return "00:00"

  const time = row[2].split(" - ")[0].replaceAll(" ", "").toLowerCase()

  return (
    format(parse(time, time.includes(":") ? "h:mma" : "ha"), "HH:mm") || null
  )
}

const getEndTime = (row: (string | undefined)[]): string | null => {
  if (!row[2]) return null
  if (row[2].includes("TBD")) return "23:59"
  if (row[2].includes("All Day")) return "23:59"

  const time = row[2].split(" - ")?.[1]?.replaceAll(" ", "")?.toLowerCase()

  if (time?.includes("pm") || time?.includes("am")) {
    return (
      format(parse(time, time.includes(":") ? "h:mma" : "ha"), "HH:mm") || null
    )
  }

  return "23:59"
}
