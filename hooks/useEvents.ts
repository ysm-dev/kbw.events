export const getEvents = async () => {
  const data = await fetch(
    "https://raw.githubusercontent.com/ysm-dev/kbw.events/2024/public/data.json",
  ).then<R>((r) => r.json())

  return data
}

type R = {
  [key in string]: Event
}

type Event = {
  image: string | null
  title: string
  host: string | null
  startDate: string | null
  endDate: string | null
  startTime: string | null
  endTime: string | null
  type: string | null
  location: string | null
  address: string | null
  entry: string | null
  link: string | null
  capacity: string | null
  email: string | null
}
