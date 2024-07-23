import { Image } from "components/Image"
import { getEvents } from "hooks/useEvents"

export const EventList = async () => {
  const events = await getEvents()

  return (
    <div className="flex flex-col gap-4">
      {Object.values(events).map((e) => (
        <article key={e.title} className="flex">
          <div className="flex w-min grow flex-col">
            <h2 className="text-balance font-medium text-lg leading-tight">
              {e.title}
            </h2>
            <p className="text-xs opacity-50">{e.location}</p>
          </div>
          <div className="">
            {e.image && (
              <Image
                className="aspect-square size-24 overflow-hidden rounded object-cover"
                src={e.image}
                unoptimized
                width={0}
                height={0}
                alt={e.title}
              />
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
