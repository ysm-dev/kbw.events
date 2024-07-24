import s from "@sindresorhus/slugify"

export const slugify = (text: string) => {
  return s(text, { lowercase: false })
}
