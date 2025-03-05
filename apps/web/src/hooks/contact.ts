// hooks/useContactApplication.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useTranslation } from '@/components/i18n';

import { useToast } from './use-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const useContactSubmission = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post(`${API_URL}/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    },
    onSuccess: () => {
      toast({
        title: t('contact.submitSuccess'),
        description: t('contact.submitSuccessMessage'),
      });
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
      toast({
        title: t('contact.submitError'),
        description: t('contact.submitErrorMessage'),
        variant: 'destructive',
      });
    },
  });
};
