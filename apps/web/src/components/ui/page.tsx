import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { Spinner } from './spinner';

interface PageProps {
  isLoading?: boolean;
  error?: { errorCode: string; message: string } | null;
  className?: string;
  children?: React.ReactNode;
  pageTitle?: string;
}

export function Page({ isLoading, children, error, className, pageTitle }: PageProps) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <main className={cn('min-h-screen w-full flex flex-col', className)}>
      {pageTitle && <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>}
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        children
      )}
    </main>
  );
}
