import { useState } from "react";

// Form Component
export interface FormItem {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    hint?:string;
  }
  
export interface FormProps {
    onSubmit: (data: Record<string, any>) => Promise<void>;
    items: FormItem[];
    submitText: string;
  }
  
export const Form = ({ onSubmit, items, submitText }: FormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');
  
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
  
      try {
        await onSubmit(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        {items.map((item) => (
          <div key={item.name}>
            <label 
              htmlFor={item.name}
              className="block text-sm font-medium text-gray-700"
            >
              {item.label}
            </label>
            <input
              type={item.type || 'text'}
              name={item.name}
              id={item.name}
              required={item.required}
              placeholder={item.placeholder}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : submitText}
        </button>
      </form>
    );
  };