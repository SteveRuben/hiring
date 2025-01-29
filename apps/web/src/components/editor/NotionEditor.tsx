"use client";

import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Image as ImageIcon,
  Code,
  Quote,
  Type,
  Table,
  CheckSquare,
  Plus,
  Link,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const NotionEditor = () => {
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [floatingMenuPosition, setFloatingMenuPosition] = useState({ top: 0, left: 0 });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '/') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSlashMenuPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
        setShowSlashMenu(true);
      }
    }
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setFloatingMenuPosition({
        top: rect.top - 40 + window.scrollY,
        left: rect.left + (rect.width / 2) + window.scrollX
      });
      setShowFloatingMenu(true);
    } else {
      setShowFloatingMenu(false);
    }
  };

  // Liste des commandes pour le menu slash
  const slashCommands = [
    { icon: Type, label: 'Text', description: 'Just start writing with plain text' },
    { icon: Heading1, label: 'Heading 1', description: 'Big section heading' },
    { icon: Heading2, label: 'Heading 2', description: 'Medium section heading' },
    { icon: List, label: 'Bullet List', description: 'Create a simple bullet list' },
    { icon: ListOrdered, label: 'Numbered List', description: 'Create a numbered list' },
    { icon: CheckSquare, label: 'To-do List', description: 'Track tasks with a to-do list' },
    { icon: Table, label: 'Table', description: 'Add a table to your document' },
    { icon: Code, label: 'Code Block', description: 'Capture a code snippet' },
    { icon: Quote, label: 'Quote', description: 'Capture a quote' },
    { icon: ImageIcon, label: 'Image', description: 'Upload or embed an image' }
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Menu flottant */}
      {showFloatingMenu && (
        <div 
          className="fixed bg-white shadow-lg rounded-lg border p-1 flex items-center gap-1 transform -translate-x-1/2"
          style={{ 
            top: `${floatingMenuPosition.top}px`, 
            left: `${floatingMenuPosition.left}px` 
          }}
        >
          <Button variant="ghost" size="sm">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Underline className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Code className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Link className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Menu slash */}
      {showSlashMenu && (
        <div 
          className="fixed bg-white shadow-lg rounded-lg border min-w-[300px]"
          style={{ 
            top: `${slashMenuPosition.top}px`, 
            left: `${slashMenuPosition.left}px` 
          }}
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Filter commands..."
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {slashCommands.map((command, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
              >
                <command.icon className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium">{command.label}</div>
                  <div className="text-sm text-gray-500">{command.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zone d'édition */}
      <div
        contentEditable
        className="prose max-w-none focus:outline-none min-h-[500px]"
        onKeyDown={handleKeyDown}
        onSelect={handleSelectionChange}
        suppressContentEditableWarning
      >
        <h1>Getting Started</h1>
        <p>Type '/' for commands or select text to format</p>
      </div>

      {/* Bouton d'ajout flottant */}
      <button className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default NotionEditor;