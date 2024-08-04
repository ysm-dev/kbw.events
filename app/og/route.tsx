import { ImageResponse } from "next/og"

export const runtime = "edge"

const size = {
  width: 1200,
  height: 630,
}

export async function GET() {
  const geist = fetch(new URL("./Geist-SemiBold.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  )

  return new ImageResponse(
    <div
      tw="flex flex-col h-full w-full items-center justify-center"
      style={{
        backgroundColor: "#020817",
        color: "#F8FAFC",
      }}
    >
      <h1 tw="text-7xl font-semibold">Korea Blockchain Week 2024</h1>
      <h1 tw="text-7xl font-semibold">Official Side Event List</h1>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: await geist,
          style: "normal",
          weight: 600,
        },
      ],
    },
  )
}
