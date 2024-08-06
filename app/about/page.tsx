"use client"

import { allPosts } from "content-collections"
import { sendLog } from "hooks/useLogging"
import { useLayoutEffect } from "react"

export default function Page() {
  const about = allPosts[0]

  useLayoutEffect(() => {
    const a = document.querySelector<HTMLAnchorElement>(
      `a[href^="https://github.com/"]`,
    )

    if (a) {
      a.onclick = () => {
        sendLog(a.textContent!)
      }
    }
  }, [])

  return (
    <div id="about" className="prose dark:prose-invert m-2 p-2">
      {/* <h1 className="text-center font-extrabold text-xl uppercase"></h1> */}
      <div dangerouslySetInnerHTML={{ __html: about.html }} />
    </div>
  )
}
