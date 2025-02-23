'use client';
import React from 'react';

import NotionLikeEditor from '@/components/tutoriel/NotionLikeEditor';

const TutorialCodePage: React.FC = () => {
  return (
    <main className="flex">
      <div className="z-10 w-full font-mono text-sm">
        <h1 className="mb-4 text-4xl font-bold">Nouveau tutoriel</h1>
        <div className="w-full ">
          <NotionLikeEditor />
        </div>
      </div>
    </main>
  );
};

export default TutorialCodePage;
