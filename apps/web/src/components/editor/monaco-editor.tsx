"use client";

import { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { loader } from '@monaco-editor/react';
import { Editor } from '@monaco-editor/react';
import { Card } from "@/components/ui/card";

interface MonacoEditorProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
  height?: string;
  theme?: "vs-dark" | "light";
  readOnly?: boolean;
}

export function MonacoEditor({
  value,
  language,
  onChange,
  height = "400px",
  theme = "vs-dark",
  readOnly = false
}: MonacoEditorProps) {
  const editorRef = useRef<any>(null);

  // Configuration de l'éditeur
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    // Configuration de l'éditeur
    editor.updateOptions({
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineHeight: 21,
      padding: { top: 10, bottom: 10 },
      folding: true,
      autoClosingBrackets: "always",
      autoClosingQuotes: "always",
      formatOnPaste: true,
      formatOnType: true
    });
  };

  // Configuration du thème
  useEffect(() => {
    monaco.editor.defineTheme('prep-ai-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1a1a1a',
      }
    });

    monaco.editor.defineTheme('prep-ai-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
      }
    });
  }, []);

  return (
    <Card className="overflow-hidden border">
      <Editor
        height={height}
        defaultLanguage={language}
        value={value}
        theme={theme}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          automaticLayout: true,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          minimap: {
            enabled: true
          },
          // Suggestions et autocomplétion
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          snippetSuggestions: "inline",
          // Format du code
          formatOnPaste: true,
          formatOnType: true,
          // UI
          lineNumbers: "on",
          glyphMargin: true,
          folding: true,
          // Personnalisation
          fontFamily: "'Fira Code', monospace",
          fontSize: 14
        }}
        loading={
          <div className="flex items-center justify-center h-full">
            Loading editor...
          </div>
        }
      />
    </Card>
  );
}