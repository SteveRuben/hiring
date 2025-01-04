import { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { Label } from "@prep-ai/ui/components/ui/label";
import { Badge } from "@prep-ai/ui/components/ui/badge";
import { Input } from "@prep-ai/ui/components/ui/input";

interface SkillInputProps {
  value: string[];
  onChange: (skills: string[]) => void;
  suggestions?: {
    id: number;
    name: string;
    usageCount: number;
  }[];
  loading?: boolean;
  label?: string;
  tooltip?: string;
}

const SkillInput = ({
  value = [],
  onChange,
  suggestions = [],
  loading = false,
  label = "Skills",
  tooltip = "Press Enter or comma to add a skill",
}: SkillInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !value.includes(trimmedSkill)) {
      onChange([...value, trimmedSkill]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddSkill(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      // @ts-expect-error(if empty or null or undefined)
      handleRemoveSkill(value[value.length - 1]);
    }
  };

  const filteredSuggestions = suggestions
    .filter(
      (suggestion) =>
        suggestion.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !value.includes(suggestion.name),
    )
    .slice(0, 5);

  return (
    <div className="w-full">
      {label && <Label>{label}</Label>}
      <div className="flex flex-wrap gap-2 p-2 min-h-[100px] border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {value.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="h-6 px-2 flex items-center gap-1"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="ml-1 hover:text-destructive focus:outline-none"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <div className="flex-1 relative">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter"
            className="border-0 shadow-none focus-visible:ring-0"
          />

          {showSuggestions &&
            inputValue &&
            filteredSuggestions.length > 0 &&
            !loading && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-popover border rounded-md shadow-lg z-10">
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleAddSkill(suggestion.name)}
                    className="w-full text-left px-3 py-2 hover:bg-accent flex items-center gap-2"
                  >
                    <Plus className="h-3 w-3" />
                    <span>{suggestion.name}</span>
                    <span className="ml-auto text-sm text-muted-foreground">
                      Used {suggestion.usageCount} times
                    </span>
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>
      {tooltip && (
        <p className="text-sm text-muted-foreground mt-1"> {tooltip} </p>
      )}
    </div>
  );
};

export default SkillInput;
