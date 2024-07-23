import { writeFile } from "node:fs/promises"
import { isURL } from "utils/isURL"
import { toCID } from "utils/toCID"

export const saveImage = async (url?: string | null) => {
  if (!isURL(url)) return null

  const cid = toCID(url)

  const res = await fetch(url)
  const buffer = await res.arrayBuffer()

  const data = new Uint8Array(buffer)
  await writeFile(`public/imgs/${cid}.png`, data)

  return `https://raw.githubusercontent.com/ysm-dev/kbw.events/2024/public/imgs/${cid}`
}
