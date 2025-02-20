'use client';
import React from 'react';

import Editor from '@/components/tutoriel/editor';

const TutorialCodePage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-4 text-4xl font-bold">Éditeur de style Notion</h1>
        <div className="h-[600px] w-full border border-gray-200 rounded-lg shadow-lg">
          <Editor />
        </div>
      </div>
    </main>
  );
};

export default TutorialCodePage;
