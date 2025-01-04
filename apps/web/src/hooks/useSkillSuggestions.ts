import { useState, useEffect } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1";
interface Skill {
  id: number;
  name: string;
  usageCount: number;
}

export function useSkillSuggestions() {
  const [suggestions, setSuggestions] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/reference-data/skills`);
      const data = await response.json();
      setSuggestions(data.skills);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return { suggestions, loading, error };
}
