import { AxiosError } from "axios"
import toast from "react-hot-toast"

export function requestError(error: Error) {
  if (error instanceof AxiosError) {
    return toast.error(error.response?.data.message)
  }

  toast.error(error.message)
}