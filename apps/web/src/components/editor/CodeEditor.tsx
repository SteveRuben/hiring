"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";

interface CodeEditorProps {
  initialValue: string;
  language: string;
  onChange: (value: string, errors: any[]) => void;
  height?: string;
}

export function CodeEditor({
  initialValue = "",
  language = "javascript",
  onChange,
  height = "400px"
}: CodeEditorProps) {
  const [code, setCode] = useState(initialValue);
  const [errors, setErrors] = useState<any[]>([]);

  const validateJavaScript = (code: string) => {
    try {
      // Tentative de parsing du code
      new Function(code);
      return [];
    } catch (error: any) {
      return [{
        line: error.lineNumber || 1,
        message: error.message,
        severity: 'error'
      }];
    }
  };

  const validatePython = (code: string) => {
    // Vérification basique de la syntaxe Python
    const errors = [];
    const lines = code.split('\n');
    
    // Vérification de l'indentation
    let expectedIndent = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const indent = line.search(/\S/);
      if (indent > expectedIndent) {
        errors.push({
          line: i + 1,
          message: 'Unexpected indentation',
          severity: 'error'
        });
      }
      if (line.trim().endsWith(':')) {
        expectedIndent += 4;
      }
    }

    return errors;
  };

  const validateCode = (code: string) => {
    switch (language.toLowerCase()) {
      case 'javascript':
        return validateJavaScript(code);
      case 'python':
        return validatePython(code);
      default:
        return [];
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    
    // Validation en temps réel
    const newErrors = validateCode(newCode);
    setErrors(newErrors);
    onChange(newCode, newErrors);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{language}</span>
          {errors.length === 0 ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
        </div>
        {errors.length > 0 && (
          <span className="text-sm text-red-500">
            {errors.length} error(s) found
          </span>
        )}
      </div>

      <div className="relative rounded-lg border">
        {/* Numéros de ligne */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 border-r 
                     flex flex-col items-center py-2 text-sm text-gray-400"
          style={{ height }}
        >
          {Array.from({ length: code.split('\n').length }).map((_, i) => (
            <div 
              key={i}
              className={`w-full text-center ${
                errors.some(error => error.line === i + 1) ? 'bg-red-100' : ''
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Éditeur de code */}
        <textarea
          value={code}
          onChange={handleCodeChange}
          className={`w-full font-mono text-sm p-2 pl-14 resize-none bg-transparent
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     ${errors.length > 0 ? 'border-red-300' : 'border-gray-300'}`}
          style={{ 
            height,
            lineHeight: '1.5',
            tabSize: 2
          }}
          spellCheck="false"
          onKeyDown={(e) => {
            // Gestion de la tabulation
            if (e.key === 'Tab') {
              e.preventDefault();
              const start = e.currentTarget.selectionStart;
              const end = e.currentTarget.selectionEnd;
              const newCode = code.substring(0, start) + '  ' + code.substring(end);
              setCode(newCode);
              // Mise à jour de la position du curseur
              e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
            }
          }}
        />
      </div>

      {/* Liste des erreurs */}
      {errors.length > 0 && (
        <div className="mt-2 space-y-1">
          {errors.map((error, index) => (
            <div 
              key={index}
              className="text-sm text-red-500 flex items-start gap-2"
            >
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span>
                Line {error.line}: {error.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}