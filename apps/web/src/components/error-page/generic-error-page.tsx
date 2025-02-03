import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface GenericErrorPageProps {
  buttonText: string;
  onClick: () => void;
  quoteText: string;
  title: string;
  body: string;
  errorMessage?: string;
  imgSrc?: string;
  imgAltText?: string;
  subMessage?: ReactNode;
  isLoading?: boolean;
}

export const GenericErrorPage: FC<GenericErrorPageProps> = ({
  buttonText,
  onClick,
  quoteText,
  title,
  body,
  errorMessage,
  imgSrc,
  imgAltText,
  subMessage,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-muted p-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <Card className="flex items-center justify-center p-6">
          <CardContent className="max-w-md space-y-4">
            <p className="text-sm text-muted-foreground">{quoteText}</p>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-base">{body}</p>
            {errorMessage && <p className="text-base text-destructive">{errorMessage}</p>}
            <Button onClick={onClick} className="min-w-[190px]">
              {buttonText}
            </Button>
            {subMessage && <p className="text-sm text-muted-foreground">{subMessage}</p>}
          </CardContent>
        </Card>

        {imgSrc && (
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <div className="relative h-[400px] w-[600px]">
              <Image src={imgSrc} alt={imgAltText || ''} fill className="object-contain" priority />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
