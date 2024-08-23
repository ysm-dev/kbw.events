import "app/globals.css"

import { Footer } from "app/components/Footer"
import { Header } from "app/components/Header"
import { Main } from "app/components/Main"
import { CFAnalytics } from "components/CFAnalytics"
import { Providers } from "components/Providers"
import { Toaster } from "components/ui/sonner"
import { HOST } from "constants/urls"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { cn } from "lib/utils"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getBaseURL } from "utils/getBaseURL"

type Props = {
  children: ReactNode
}

const title = "KBW 2024 Side Events"
const description = ""

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: `https://${HOST}`,
    siteName: title,
    images: "/og",
  },
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={cn(GeistMono.variable, GeistSans.variable)}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="antialiased">
        <Providers>
          <Header />
          <Main>{children}</Main>
          <Footer />
          <Toaster />
        </Providers>
        <CFAnalytics />
      </body>
    </html>
  )
}
