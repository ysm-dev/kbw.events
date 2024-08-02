import { Footer } from "app/components/Footer"
import { Header } from "app/components/Header"
import { Main } from "app/components/Main"
import "app/globals.css"

import { Providers } from "components/Providers"
import { Toaster } from "components/ui/sonner"
import { HOST } from "constants/urls"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { cn } from "lib/utils"
import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "KBW Events"
  const description = ""

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${HOST}`,
      siteName: title,
    },
  }
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={cn(GeistMono.variable, GeistSans.variable)}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="antialiased">
        <Providers>
          <Header />
          <Main>{children}</Main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
