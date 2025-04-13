// import Editor, { Monaco } from '@monaco-editor/react';
// import React, { useRef } from 'react';

// interface MonacoEditorProps {
//   language: string;
//   theme?: string;
//   value: string;
//   // eslint-disable-next-line no-unused-vars
//   onChange: (value: string | undefined) => void;
//   readOnly?: boolean;
// }

// const MonacoEditor: React.FC<MonacoEditorProps> = ({
//   language,
//   theme = 'vs-dark',
//   value,
//   onChange,
//   readOnly = false,
// }) => {
//   const editorRef = useRef<any>(null);

//   const handleEditorDidMount = (editor: any, monaco: Monaco) => {
//     editorRef.current = editor;

//     // Configuration supplémentaire pour TypeScript
//     if (language === 'typescript') {
//       monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//         target: monaco.languages.typescript.ScriptTarget.ES2020,
//         allowNonTsExtensions: true,
//         moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
//         module: monaco.languages.typescript.ModuleKind.CommonJS,
//         noEmit: true,
//         typeRoots: ['node_modules/@types'],
//       });
//     }
//   };

//   return (
//     <Editor
//       height="500px"
//       width="100%"
//       language={language}
//       theme={theme}
//       value={value}
//       onMount={handleEditorDidMount}
//       onChange={onChange}
//       options={{
//         minimap: { enabled: true },
//         scrollBeyondLastLine: false,
//         fontSize: 14,
//         readOnly,
//         automaticLayout: true,
//         wordWrap: 'on',
//         lineNumbers: 'on',
//         folding: true,
//         renderLineHighlight: 'all',
//       }}
//     />
//   );
// };

// // export default MonacoEditor;
// import Editor, { Monaco } from '@monaco-editor/react';
// import React, { useRef } from 'react';

// interface MonacoEditorProps {
//   language: string;
//   theme?: string;
//   value: string;
//   // eslint-disable-next-line no-unused-vars
//   onChange: (value: string | undefined) => void;
//   readOnly?: boolean;
//   fontSize?: number;
// }

// const MonacoEditor: React.FC<MonacoEditorProps> = ({
//   language,
//   theme = 'vs-dark',
//   value,
//   onChange,
//   readOnly = false,
//   fontSize = 14,
// }) => {
//   const editorRef = useRef<any>(null);

//   const handleEditorDidMount = (editor: any, monaco: Monaco) => {
//     editorRef.current = editor;

//     // Configuration supplémentaire pour TypeScript
//     if (language === 'typescript') {
//       monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//         target: monaco.languages.typescript.ScriptTarget.ES2020,
//         allowNonTsExtensions: true,
//         moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
//         module: monaco.languages.typescript.ModuleKind.CommonJS,
//         noEmit: true,
//         typeRoots: ['node_modules/@types'],
//       });
//     }

//     // Configuration des raccourcis clavier
//     editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
//       console.log('Saving code...');
//       // Vous pouvez ici déclencher une sauvegarde automatique
//     });

//     // Auto-indent on paste
//     editor.onDidPaste(() => {
//       editor.getAction('editor.action.formatDocument').run();
//     });
//   };

//   return (
//     <div className="border rounded-md overflow-hidden">
//       <Editor
//         height="500px"
//         width="100%"
//         language={language}
//         theme={theme}
//         value={value}
//         onMount={handleEditorDidMount}
//         onChange={onChange}
//         options={{
//           minimap: { enabled: true },
//           scrollBeyondLastLine: false,
//           fontSize: fontSize,
//           readOnly,
//           automaticLayout: true,
//           wordWrap: 'on',
//           lineNumbers: 'on',
//           folding: true,
//           renderLineHighlight: 'all',
//           formatOnPaste: true,
//           formatOnType: true,
//           autoIndent: 'full',
//           cursorBlinking: 'smooth',
//           quickSuggestions: true,
//           suggestOnTriggerCharacters: true,
//           tabSize: 2,
//           rulers: [],
//           codeLens: true,
//         }}
//       />
//     </div>
//   );
// };

// export default MonacoEditor;

import Editor, { Monaco } from '@monaco-editor/react';
import React, { useRef } from 'react';

interface MonacoEditorProps {
  language: string;
  theme?: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
  fontSize?: number;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  language,
  theme = 'vs-dark',
  value,
  onChange,
  readOnly = false,
  fontSize = 14,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    // Configuration supplémentaire pour TypeScript
    if (language === 'typescript' || language === 'javascript') {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        typeRoots: ['node_modules/@types'],
      });
    }

    // Configuration des raccourcis clavier
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      console.log('Saving code...');
      // Vous pouvez ici déclencher une sauvegarde automatique
    });

    // Auto-indent on paste
    editor.onDidPaste(() => {
      editor.getAction('editor.action.formatDocument')?.run();
    });

    // Focus sur l'éditeur
    setTimeout(() => {
      editor.focus();
    }, 100);
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    // Pré-configuration de l'éditeur avant son montage
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.lineHighlightBackground': '#2a2a2a',
        'editorLineNumber.foreground': '#6e6e6e',
        'editorLineNumber.activeForeground': '#bbbbbb',
      },
    });

    if (theme === 'vs-dark') {
      theme = 'custom-dark';
    }
  };

  return (
    <div className="h-full border-0 overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        language={language}
        theme={theme}
        value={value}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onChange={onChange}
        options={{
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: fontSize,
          readOnly,
          automaticLayout: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          renderLineHighlight: 'all',
          formatOnPaste: true,
          formatOnType: true,
          autoIndent: 'full',
          cursorBlinking: 'smooth',
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          tabSize: 2,
          rulers: [],
          codeLens: true,
          snippetSuggestions: 'inline',
          contextmenu: true,
          smoothScrolling: true,
          cursorSmoothCaretAnimation: 'on',
          bracketPairColorization: {
            enabled: true,
          },
        }}
      />
    </div>
  );
};

export default MonacoEditor;
