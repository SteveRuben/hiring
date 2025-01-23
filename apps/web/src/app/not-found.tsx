import { ErrorPage } from "@/components/error-page/error-page";
import { ErrorCodes } from "@/constants/error-codes";


export default function NotFound() {
  return <ErrorPage type={ErrorCodes.PAGE_NOT_FOUND} />
}