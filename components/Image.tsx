"use client"

import { cn } from "lib/utils"
import NextImage from "next/image"
import { type ComponentProps, type ReactNode, useState } from "react"

type Props = ComponentProps<typeof NextImage> & {
  pending?: ReactNode
}

type PendingProps = ComponentProps<"div">

const Pending = ({ className }: PendingProps) => {
  return <div className={cn("animate-pulse bg-foreground/10", className)} />
}

export const Image = ({ pending, className, ...props }: Props) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && (pending ?? <Pending className={className} />)}
      <NextImage
        className={cn(className, !loaded && "hidden")}
        priority
        {...props}
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}
