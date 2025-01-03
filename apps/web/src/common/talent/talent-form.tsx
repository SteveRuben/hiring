
"use client"

import { useState } from 'react';
import { Button } from "@prep-ai/ui/components/ui/button";
import { Input } from "@prep-ai/ui/components/ui/input";
import { Textarea } from "@prep-ai/ui/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@prep-ai/ui/components/ui/card";
import { Label } from "@prep-ai/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@prep-ai/ui/components/ui/select";
import { Badge } from "@prep-ai/ui/components/ui/badge";
import { X } from "lucide-react";
import { useTranslation } from '../i18n';
import { useReferenceData } from '../../hooks/seReferenceData';


const TalentForm = () => {
  
  const { data, loading, error } = useReferenceData();
  const { t } = useTranslation();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading reference data</div>;

   
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{t('talent.formTitle')}</CardTitle>
            <CardDescription>
            {t('talent.formDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <form className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('talent.formPersoInfo')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('talent.formFirstName')}</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('talent.formLastName')}</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('talent.formEmail')}</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('talent.formProfessinalInfo')}</h3>
                <div className="space-y-2">
                  <Label htmlFor="experience">{t('talent.formExperienceYear')}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('talent.selectExperience')} />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.experienceLevels.map(level => (
                        <SelectItem key={level.id} value={level.id}>
                          {t(level.label)} ({level.range.min}-{level.range.max ?? '∞'} {t('years')})
                        </SelectItem>
                      ))}
                    </SelectContent>
                </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('talent.formPrimaryExpertise')}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('talent.selectExpertise')} />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.expertiseAreas.map(area => (
                        <SelectItem key={area.id} value={area.id}>
                          {t(area.label)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('talent.formSkills')}</Label>
                  <Input
                    type="text"
                    list="skills"
                    placeholder={t('talent.enterSkill')}
                  />
                  <datalist id="skills">
                    {data?.skills.map(skill => (
                      <option key={skill.id} value={skill.name} />
                    ))}
                  </datalist>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">{t('talent.formBio')}</Label>
                  <Textarea 
                    id="bio"
                    placeholder={t('talent.formBioPlaceholder')}
                    className="h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cv">{t('talent.formProfessionnalResume')}</Label>
                  <Input 
                    id="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload your CV in PDF, DOC, or DOCX format (max 5MB)
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full">
              {t('talent.formSubmit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TalentForm;