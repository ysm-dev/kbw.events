export const hopFetch = async (url: string) => {
  const res = await fetch("https://proxy.hoppscotch.io/", {
    method: "POST",
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,ko;q=0.8",
      "content-type": "application/json",
      dnt: "1",
      origin: "https://hoppscotch.io",
      priority: "u=1, i",
      referer: "https://hoppscotch.io/",
      "sec-ch-ua": '"Chromium";v="127", "Not)A;Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      method: "GET",
      url,
      headers: {},
      params: {},
      data: null,
      wantsBinary: true,
      accessToken: "",
    }),
  }).then<R>((r) => r.json())

  return new Response(atob(res.data), {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  })
}

interface R {
  success: boolean
  isBinary: boolean
  status: number
  data: string
  statusText: string
  headers: Headers
}
