import { CID } from "multiformats/cid"
import * as raw from "multiformats/codecs/raw"
import { sha256 } from "@noble/hashes/sha256"
import { create } from "multiformats/hashes/digest"

export const toCID = (txt: string) => {
  return CID.createV1(raw.code, create(0x12, sha256(txt))).toString()
}
