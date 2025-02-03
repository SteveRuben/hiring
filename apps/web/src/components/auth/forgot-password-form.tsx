'use client';

import { useTranslation } from '@/components/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { t } = useTranslation();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form noValidate={true} className="mb-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">{t('auth.forgotPassword.title')}</h1>
            <p className="text-balance text-muted-foreground">
              {t('auth.forgotPassword.subtitle')}
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t('auth.signup.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('auth.signup.emailPlaceholder')}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {t('auth.forgotPassword.submit')}
          </Button>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
