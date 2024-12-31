
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


const TalentForm = () => {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = (e:any) => {
    e.preventDefault();
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove:any) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

   const { t } = useTranslation();
   
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
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="4-6">4-6 years</SelectItem>
                      <SelectItem value="7-10">7-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('talent.formPrimaryExpertise')}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend Development</SelectItem>
                      <SelectItem value="backend">Backend Development</SelectItem>
                      <SelectItem value="fullstack">Full Stack Development</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('talent.formSkills')}</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      placeholder="Add a skill (e.g., React, Node.js)"
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddSkill}
                    >
                      {t('talent.formAddSkill')}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill) => (
                      <Badge 
                        key={skill}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
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