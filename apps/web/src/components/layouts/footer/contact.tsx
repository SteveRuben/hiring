'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';

import { useTranslation } from '@/components/i18n';
// import { submitContact } from "../actions/contact"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormData, useContactSubmission } from '@/hooks/contact';

export function ContactForm() {
  const { mutate: submitApplication, isPending } = useContactSubmission();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email } = formData;
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = 'Le champ nom est requis.';
    if (!email.trim()) newErrors.email = 'Le champ email est requis.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (!validateForm()) return;
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([Key, value]) => {
      formDataToSend.append(Key, value);
    });

    submitApplication(formDataToSend, {
      onSuccess: () => {
        console.log('contact envoyer avec succès.');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto" method="post">
      <div>
        <Label htmlFor="name">
          Nom <span className="text-red-600">*</span>
        </Label>
        <Input
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="name"
          name="name"
          placeholder="Entrez votre nom"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="email">
          Email<span className="text-red-600"> *</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Entrez votre email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Entrez un message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="bg-violet-950" disabled={isPending}>
        Envoyer
      </Button>
    </form>
  );
}
