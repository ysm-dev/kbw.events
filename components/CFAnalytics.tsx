import Script from "next/script"
import { isProd } from "utils/isProd"

export function CFAnalytics() {
  return isProd() ? (
    // a
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({
        token: "524ef066c6c14402bef38b64f1659c8f",
      })}
      strategy="afterInteractive"
    />
  ) : null
}
