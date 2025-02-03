'use client';

import { ErrorPage } from '@/components/error-page/error-page';
import { ErrorCodes } from '@/constants/error-codes';

export default function Error({ error }: { error: Error }) {
  return <ErrorPage type={ErrorCodes.UNEXPECTED} errorMessage={error.message} />;
}
