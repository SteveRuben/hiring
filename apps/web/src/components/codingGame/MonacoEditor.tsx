import Editor, { Monaco } from '@monaco-editor/react';
import React, { useRef } from 'react';

interface MonacoEditorProps {
  language: string;
  theme?: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  language,
  theme = 'vs-dark',
  value,
  onChange,
  readOnly = false,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    // Configuration supplémentaire pour TypeScript
    if (language === 'typescript') {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        typeRoots: ['node_modules/@types'],
      });
    }
  };

  return (
    <Editor
      height="500px"
      width="100%"
      language={language}
      theme={theme}
      value={value}
      onMount={handleEditorDidMount}
      onChange={onChange}
      options={{
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        fontSize: 14,
        readOnly,
        automaticLayout: true,
        wordWrap: 'on',
        lineNumbers: 'on',
        folding: true,
        renderLineHighlight: 'all',
      }}
    />
  );
};

export default MonacoEditor;
