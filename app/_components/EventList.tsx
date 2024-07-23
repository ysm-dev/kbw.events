import { Image } from "components/Image"
import { Button } from "components/ui/button"
import { Toggle } from "components/ui/toggle"
import { getEvents } from "hooks/useEvents"
import { Bookmark, Share } from "lucide-react"

export const EventList = async () => {
  const events = await getEvents()

  return (
    <div className="flex flex-col gap-4">
      {Object.values(events).map((e) => (
        <article key={e.title} className="flex gap-4 rounded-xl border p-2">
          <div className="flex w-min grow flex-col">
            <h2 className="text-balance font-medium text-lg leading-tight">
              {e.title}
            </h2>
            <p className="text-xs opacity-50">{e.location}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="grow" />
              <Button
                size="icon"
                variant="outline"
                className="-mr-1 -mt-1 size-6"
              >
                <Share className="size-4" />
              </Button>
              <Toggle
                variant="outline"
                className="group -mr-1 -mt-1 size-6 p-0"
              >
                <Bookmark className="size-4 group-data-[state=on]:fill-foreground" />
              </Toggle>
            </div>
            {e.image && (
              <Image
                className="aspect-square size-24 overflow-hidden rounded-lg object-cover"
                src={e.image}
                width={200}
                height={200}
                alt={e.title}
              />
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
