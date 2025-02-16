import { ErrorPage } from '@/components/error-page/error-page';
import { ErrorCodes } from '@/constants/error-codes';

export default function NotFound({ searchParams }: { searchParams: { message?: string } }) {

  return <ErrorPage type={ErrorCodes.PAGE_NOT_FOUND} errorMessage={searchParams?.message } />;
}
