"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useMediaQuery } from "foxact/use-media-query"
import type { ComponentProps } from "react"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../tailwind.config"

const { theme } = resolveConfig(tailwindConfig)

type DrawerDialogProps =
  | ComponentProps<typeof Drawer>
  | ComponentProps<typeof Dialog>

export function DrawerDialog(props: DrawerDialogProps) {
  const isDesktop = useMediaQuery(`(min-width: ${theme.screens.sm})`, false)

  if (isDesktop) {
    return <Dialog {...props} />
  }

  return <Drawer {...props} noBodyStyles />
}

type DrawerDialogTriggerProps =
  | ComponentProps<typeof DrawerTrigger>
  | ComponentProps<typeof DialogTrigger>

export function DrawerDialogTrigger(props: DrawerDialogTriggerProps) {
  const isDesktop = useMediaQuery(`(min-width: ${theme.screens.sm})`, false)

  if (isDesktop) {
    return <DialogTrigger {...props} />
  }

  return <DrawerTrigger {...props} />
}

type DrawerDialogContentProps =
  | ComponentProps<typeof DrawerContent>
  | ComponentProps<typeof DialogContent>

export function DrawerDialogContent(props: DrawerDialogContentProps) {
  const isDesktop = useMediaQuery(`(min-width: ${theme.screens.sm})`, false)

  if (isDesktop) {
    return <DialogContent {...props} />
  }

  // @ts-ignore
  return <DrawerContent {...props} />
}
