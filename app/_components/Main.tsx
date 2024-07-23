import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const Main = ({ children }: Props) => {
  return <main className="mx-auto max-w-screen-md">{children}</main>
}
