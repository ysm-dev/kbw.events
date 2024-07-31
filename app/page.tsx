import { EventList } from "app/components/EventList"

export const runtime = "edge"
export const revalidate = 180

export default function Page() {
  return (
    <div id="home" className="m-2 p-2 text-2xl">
      <h1 className="text-center font-extrabold text-xl uppercase">
        Korea Blockchain Week 2024 Official Side Event List
      </h1>
      <EventList />
    </div>
  )
}
