import { getGeo } from "./getGeo"
import { getWhoami } from "./getWhoami"
import { getUA } from "./useUA"
import { memoize } from "@fxts/core"

export const getInfo = memoize(async () => {
  const info = await getWhoami()
  const { longitude, latitude } = info

  const geo = await getGeo({ longitude, latitude })

  const location = geo.data.city.name

  const ua = getUA()

  return {
    ...info,
    location,
    ...ua,
  }
})
