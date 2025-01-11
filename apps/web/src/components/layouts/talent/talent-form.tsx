"use client";

import { useRef, useState } from "react";
import { Button } from "@prep-ai/ui/components/ui/button";
import { Input } from "@prep-ai/ui/components/ui/input";
import { Textarea } from "@prep-ai/ui/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@prep-ai/ui/components/ui/card";
import { Label } from "@prep-ai/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@prep-ai/ui/components/ui/select";
import { Loader2 } from "lucide-react";
import { useReferenceData } from "@/hooks/seReferenceData";
import { useTranslation } from "@/components/i18n";
import SkillInput from "./skill-input";
import { TalentFormData, useTalentSubmission } from "@/hooks/useTalentApplication";

const TalentForm = () => {
 
  const { t } = useTranslation();
  const [skills, setSkills] = useState<string[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [formData, setFormData] = useState<TalentFormData>({
    firstName: "",
    lastName: "",
    email: "",
    experience: "",
    expertise: "",
    bio: "",
    skills: [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, error } = useReferenceData();
  const { mutate: submitApplication, isPending } = useTalentSubmission();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setResume(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      experience: "",
      expertise: "",
      bio: "",
      skills: [],
    });
    setSkills([]);
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'skills') {
        formDataToSend.append(key, JSON.stringify(skills));
      } else {
        formDataToSend.append(key, value);
      }
    });

    if (resume) {
      formDataToSend.append("resume", resume);
    }

    submitApplication(formDataToSend, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reference data</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{t("talent.formTitle")}</CardTitle>
            <CardDescription>{t("talent.formDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  {t("talent.formPersoInfo")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      {t("talent.formFirstName")}
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("talent.formLastName")}</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("talent.formEmail")}</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  {t("talent.formProfessinalInfo")}
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="experience">
                    {t("talent.formExperienceYear")}
                  </Label>
                  <Select
                    value={formData.experience}
                    name="experience"
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, experience: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("talent.selectExperience")} />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.experienceLevels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {t(level.label)} ({level.range.min}-
                          {level.range.max ?? "∞"} {t("years")})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expertise">
                    {t("talent.formPrimaryExpertise")}
                  </Label>
                  <Select
                    name="expertise"
                    value={formData.expertise}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, expertise: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("talent.selectExpertise")} />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.expertiseAreas.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          {t(area.label)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <SkillInput
                  value={skills}
                  onChange={setSkills}
                  suggestions={data?.skills}
                  loading
                  label={t("talent.formSkills")}
                  tooltip={t("talent.skilltooltips")}
                />

                <div className="space-y-2">
                  <Label htmlFor="bio">{t("talent.formBio")}</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder={t("talent.formBioPlaceholder")}
                    className="h-32"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">
                    {t("talent.formProfessionnalResume")}
                  </Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    required
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    ref={fileInputRef}
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload your CV in PDF, DOC, or DOCX format (max 5MB)
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>{t("talent.formSubmitting")}</span>
                    </>
                  ) : (
                    t("talent.formSubmit")
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TalentForm;
