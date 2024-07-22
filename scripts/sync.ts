import { googleSheetToJSON } from "scripts/fn/googleSheetToJSON"

const sheetId = `1k1xAFaLQ5nYnWVDPPvrme-iVUzfSgHJLyt5fGng7KZc`

async function main() {
  const json = await googleSheetToJSON(sheetId)

  console.log(JSON.stringify(json, null, 2))
}

main()
