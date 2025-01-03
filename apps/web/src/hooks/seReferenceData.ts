// hooks/useReferenceData.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1';
import { useState, useEffect } from 'react';

interface ReferenceData {
  expertiseAreas: Array<{
    id: string;
    name: string;
    label: string;
  }>;
  experienceLevels: Array<{
    id: string;
    name: string;
    range: { min: number; max?: number };
    label: string;
  }>;
  skills: Array<{
    id: number;
    name: string;
    usageCount: number;
  }>;
}

export function useReferenceData() {
  const [data, setData] = useState<ReferenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        const [expertiseRes, experienceRes, skillsRes] = await Promise.all([
          fetch(`${API_URL}/reference-data/expertise-areas`),
          fetch(`${API_URL}/reference-data/experience-levels`),
          fetch(`${API_URL}/reference-data/skills`)
        ]);

        const [expertise, experience, skills] = await Promise.all([
          expertiseRes.json(),
          experienceRes.json(),
          skillsRes.json()
        ]);

        setData({
          expertiseAreas: expertise.expertiseAreas,
          experienceLevels: experience.experienceLevels,
          skills: skills.skills
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferenceData();
  }, []);

  return { data, loading, error };
}