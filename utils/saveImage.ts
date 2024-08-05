import { writeFile } from "node:fs/promises"
import { isURL } from "utils/isURL"
import { toCID } from "utils/toCID"

export const saveImage = async (url?: string | null) => {
  if (!isURL(url)) return null

  const { origin, pathname } = new URL(url)

  const uri = new URL(pathname, origin).toString()

  let ext = uri.split(".").pop()

  ext = ext === "png" ? `.png` : ext === "svg" ? `.svg` : `.png`

  const cid = toCID(uri)

  const res = await fetch(uri)
  const buffer = await res.arrayBuffer()

  const data = new Uint8Array(buffer)

  const filename = `public/imgs/${cid}${ext}`

  await writeFile(filename, data)

  return `https://raw.githubusercontent.com/ysm-dev/kbw.events/2024/${filename}`
}
