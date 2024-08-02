"use client"

import { allPosts } from "content-collections"

export default function Page() {
  const about = allPosts[0]

  return (
    <div id="about" className="markdown m-2 p-2 text-2xl">
      {/* <h1 className="text-center font-extrabold text-xl uppercase"></h1> */}
      <div dangerouslySetInnerHTML={{ __html: about.html }} />
    </div>
  )
}
