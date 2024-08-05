import { HOST } from "constants/urls"
import { isProd } from "utils/isProd"

export const getBaseURL = () => {
  if (isProd()) {
    return `https://${HOST}`
  }
  return `http://localhost:9090`
}
