import { writeFile } from "node:fs/promises"
import { googleSheetToJSON } from "scripts/fn/googleSheetToJSON"
import { normalize } from "scripts/fn/normalize"

const sheetId = `1k1xAFaLQ5nYnWVDPPvrme-iVUzfSgHJLyt5fGng7KZc`

async function main() {
  const raw = await googleSheetToJSON(sheetId)

  await writeFile(`./public/raw.json`, JSON.stringify(raw, null, 2))

  const data = await normalize(raw)

  await writeFile(`./public/data.json`, JSON.stringify(data, null, 2))
}

main()
