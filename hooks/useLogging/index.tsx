import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { isLocal } from "utils/isLocal"
import { isServer } from "utils/isServer"
import { sendDiscordMessage } from "./sendDiscordMessage"
import { getInfo } from "./useInfo"

const DISCORD_WEBHOOK_URL = `https://discord.com/api/webhooks/1269704711750029433/K6z7noxl6S2ZGczwDRk1yMmYrjh9OHONprYVkjJbp_tWfz6qfZQEGGv9UnYau5MDsoaf`

type Params = {
  enable?: boolean
}

export const config = {
  enabled: false,
}

export const sendLog = async (log?: string) => {
  const { enabled = isLocal() } = config

  if (!enabled) {
    return
  }

  const info = await getInfo()

  const {
    country,
    ip,
    location,
    longitude,
    latitude,
    typeEmoji,
    type = "",
    vendor = "",
    model = "",
    browser,
    os,
    isBot,
  } = info

  const { host } = window.location

  return sendDiscordMessage(DISCORD_WEBHOOK_URL, {
    avatar_url: `https://flagcdn.com/w320/${country.toLowerCase()}.webp`,
    username: `${host} - ${ip}${document.referrer ? ` - ${new URL(document.referrer).hostname}` : ""}`,
    content: `${
      log ? `${log}\n` : ""
    }📍 ${location}, (\`${latitude}\`, \`${longitude}\`) / ${typeEmoji} \`${type}\` \`${vendor}\` \`${model}\` - \`${browser}\` on \`${os}\` ${
      isBot ? "(🤖)" : ""
    }`,
  })
}

export function useLogging(parmas?: Params) {
  const path = usePathname()
  const { enable = !isLocal() } = parmas || {}

  useEffect(() => {
    if (isServer() || !enable) {
      return
    }

    config.enabled = true

    const path = location.href.replace(location.origin, "")

    sendLog(path === "/" ? undefined : path)
  }, [path])

  return { sendLog }
}
