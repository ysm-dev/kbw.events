export const isLumaPage = (url: string) => {
  try {
    const { hostname, pathname } = new URL(url)
    return hostname === "lu.ma" && pathname.split("/").length === 2
  } catch {
    return false
  }
}
