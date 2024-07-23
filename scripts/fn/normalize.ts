import { entries, indexBy, map, pipe, toArray } from "@fxts/core"
import { format } from "date-fns"
import { parse } from "date-format-parse"

export const normalize = (data: (string | undefined)[][]) => {
  const a = [data[4], data[5], ...data.slice(7)]

  const r = pipe(
    a,
    map(norm),
    toArray,
    indexBy((i) => i.title),
  )

  console.log(r)

  return r
}

const norm = (
  row: (string | undefined)[],
): { [key in string]: string | null } => {
  const title = getTitle(row)
  const host = getHost(row)
  const type = getType(row)
  const location = getLocation(row)
  const address = getAddress(row)
  const entry = getEntry(row)
  const link = getLink(row)
  const capacity = getCapacity(row)
  const email = getEmail(row)
  const startDate = getStartDate(row)
  const endDate = getEndDate(row)
  const startTime = getStartTime(row)
  const endTime = getEndTime(row)

  const r = {
    title,
    host,
    startDate,
    endDate,
    startTime,
    endTime,
    type,
    location,
    address,
    entry,
    link,
    capacity,
    email,
  }

  return pipe(
    r,
    entries,
    map(([k, v]) => [k, v?.replaceAll("\r", "") ?? null]),
    Object.fromEntries,
  )
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

/**
 * Event properties
 *
 * og image
 * title
 * host
 * event type
 * location name
 * location address
 * entry / ticket
 * rsvp link
 * capacity
 * email
 *
 *
 * start datetime
 * end datetime
 *
 */
