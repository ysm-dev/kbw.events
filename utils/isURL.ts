export const isURL = (str?: string | null): str is string => {
  if (!str) return false
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}
