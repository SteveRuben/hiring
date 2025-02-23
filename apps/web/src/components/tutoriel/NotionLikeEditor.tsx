import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

export default function App() {
  // Création des éditeurs pour le titre et la description
  const titleEditor = useCreateBlockNote();
  const descriptionEditor = useCreateBlockNote();

  return (
    <div className="p-4 space-y-4">
      {/* Éditeur pour le titre */}
      <div className="border border-gray-300 rounded-lg p-2">
        <h2 className="text-lg font-semibold mb-1">Titre</h2>
        <BlockNoteView editor={titleEditor} />
      </div>

      {/* Éditeur pour la description */}
      <div className="rounded-lg p-2">
        <h2 className="text-lg font-semibold mb-1">Description</h2>
        <BlockNoteView editor={descriptionEditor} />
      </div>
    </div>
  );
}

