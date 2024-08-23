import { isServer } from "utils/isServer"

export const isLocal = () => {
  if (isServer()) {
    return process.env.NODE_ENV === "development"
  }

  return (
    globalThis.location.hostname === "localhost" ||
    // is IP
    globalThis.location.hostname.split(".").length === 4
  )
}
