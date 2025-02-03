// hooks/useTalentApplication.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useTranslation } from '@/components/i18n';

import { useToast } from './use-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1';

export interface TalentFormData {
  firstName: string;
  lastName: string;
  email: string;
  experience: string;
  expertise: string;
  bio: string;
  skills: string[];
  resume?: File;
}

export const useTalentSubmission = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post(`${API_URL}/talent/applications`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      toast({
        title: t('talent.submitSuccess'),
        description: t('talent.submitSuccessMessage'),
      });
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
      toast({
        title: t('talent.submitError'),
        description: t('talent.submitErrorMessage'),
        variant: 'destructive',
      });
    },
  });
};
