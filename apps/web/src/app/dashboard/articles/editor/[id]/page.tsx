"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Save, MoreVertical, Share2, Settings, Eye, Plus } from 'lucide-react';
import NotionEditor from '@/components/editor/NotionEditor';

interface Props {
  params: {
    id: string;
  };
}

export default function ArticleEditorPage({ params }: Props) {
  const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState('');
  const isNewArticle = params.id === 'new';

  const handleSave = async () => {
    // Logique de sauvegarde
    console.log('Saving article:', { title });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* En-tête fixe */}
      <header className="fixed top-16 left-0 right-0 bg-white border-b z-40 h-14">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-4 flex-1">
            {/* Titre éditable */}
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Article"
              className="max-w-md border-0 focus:ring-0 text-lg font-semibold px-0"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Bouton Preview */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </Button>

            {/* Bouton Share */}
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            {/* Bouton Save */}
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>

            {/* Menu More */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Export PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Export Markdown
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Contenu principal avec espacement pour les deux en-têtes */}
      <main className="pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          {isPreview ? (
            <div className="prose max-w-none py-8">
              {/* Contenu en mode preview */}
              <h1>{title || 'Untitled Article'}</h1>
              {/* Ajouter le contenu de preview ici */}
            </div>
          ) : (
            <NotionEditor />
          )}
        </div>
      </main>

      {/* Bouton flottant pour l'ajout de blocs */}
      <button className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}