import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react"
import { Button } from "components/ui/button"
import { Globe } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="mx-auto max-w-screen-md px-4 py-16">
      <div className="my-4 h-px bg-foreground/10" />
      <div className="relative flex flex-col items-start sm:flex-row">
        <Button
          variant="ghost"
          className="mr-3 p-0 font-extrabold text-base opacity-50 transition hover:bg-transparent hover:opacity-100"
          asChild
        >
          <Link href="/">KBW2024</Link>
        </Button>
        <div className="-ml-2 flex sm:m-0">
          <Button
            variant="ghost"
            className="px-2 text-sm opacity-50 hover:opacity-100"
            asChild
          >
            <Link href="/">Discover</Link>
          </Button>
          <Button
            variant="ghost"
            className="px-2 text-sm opacity-50 hover:opacity-100"
            asChild
          >
            <Link href="/saved">Saved</Link>
          </Button>
          <Button
            variant="ghost"
            className="px-2 text-sm opacity-50 hover:opacity-100"
            asChild
          >
            <Link href="/about">About</Link>
          </Button>
        </div>
        {/* <div className="grow" /> */}
        <div className="-mr-2 absolute right-0 flex">
          <Button
            className="size-8 opacity-50 hover:opacity-100"
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://koreablockchainweek.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="size-4" />
            </a>
          </Button>
          <Button
            className="size-8 opacity-50 hover:opacity-100"
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://x.com/kbwofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandX className="size-4" />
            </a>
          </Button>
          <Button
            className="size-8 opacity-50 hover:opacity-100"
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://instagram.com/koreablockchainweek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandInstagram className="size-4" />
            </a>
          </Button>
          <Button
            className="size-8 opacity-50 hover:opacity-100"
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://youtube.com/@KoreaBlockchainWeek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandYoutube className="size-4" />
            </a>
          </Button>
          <Button
            className="size-8 opacity-50 hover:opacity-100"
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://t.me/KBW_Official"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandTelegram className="size-4" />
            </a>
          </Button>
          <Button
            className="size-8 opacity-50 hover:opacity-100"
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://linkedin.com/company/korea-blockchain-week"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandLinkedin className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
