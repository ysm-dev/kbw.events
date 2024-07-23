import { writeFile } from "node:fs/promises"
import { isURL } from "utils/isURL"
import { toCID } from "utils/toCID"

export const saveImage = async (url?: string | null) => {
  if (!isURL(url)) return null

  const { origin, pathname } = new URL(url)

  const uri = new URL(pathname, origin).toString()

  const cid = toCID(uri)

  const res = await fetch(uri)
  const buffer = await res.arrayBuffer()

  const data = new Uint8Array(buffer)
  await writeFile(`public/imgs/${cid}.png`, data)

  return `https://raw.githubusercontent.com/ysm-dev/kbw.events/2024/public/imgs/${cid}.png`
}
