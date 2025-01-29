"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Text, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered,
  Table, 
  Image as ImageIcon, 
  Code,
  Quote,
  CheckSquare,
  FileText,
  Grid,
  Divide
} from 'lucide-react';
import { Input } from "@/components/ui/input";

interface Command {
  icon: any;
  label: string;
  description: string;
  action: string;
  keywords: string[];
}

interface SlashMenuProps {
  position: { top: number; left: number };
  onSelect: (action: string) => void;
  onClose: () => void;
}

export function SlashMenu({ position, onSelect, onClose }: SlashMenuProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      icon: Text,
      label: 'Text',
      description: 'Just start writing with plain text',
      action: 'add-text',
      keywords: ['text', 'paragraph', 'write']
    },
    {
      icon: Heading1,
      label: 'Heading 1',
      description: 'Big section heading',
      action: 'add-h1',
      keywords: ['h1', 'heading', 'title', 'big']
    },
    {
      icon: Heading2,
      label: 'Heading 2',
      description: 'Medium section heading',
      action: 'add-h2',
      keywords: ['h2', 'heading', 'title', 'medium']
    },
    {
      icon: List,
      label: 'Bullet List',
      description: 'Create a simple bullet list',
      action: 'add-bullet-list',
      keywords: ['list', 'bullet', 'unordered']
    },
    {
      icon: ListOrdered,
      label: 'Numbered List',
      description: 'Create a numbered list',
      action: 'add-numbered-list',
      keywords: ['list', 'numbered', 'ordered']
    },
    {
      icon: CheckSquare,
      label: 'To-do List',
      description: 'Track tasks with a to-do list',
      action: 'add-todo',
      keywords: ['todo', 'task', 'checkbox']
    },
    {
      icon: Table,
      label: 'Table',
      description: 'Add a table to your content',
      action: 'add-table',
      keywords: ['table', 'grid', 'data']
    },
    {
      icon: Code,
      label: 'Code Block',
      description: 'Capture a code snippet',
      action: 'add-code',
      keywords: ['code', 'snippet', 'programming']
    },
    {
      icon: Quote,
      label: 'Quote',
      description: 'Capture a quotation',
      action: 'add-quote',
      keywords: ['quote', 'blockquote', 'cite']
    },
    {
      icon: ImageIcon,
      label: 'Image',
      description: 'Upload or embed an image',
      action: 'add-image',
      keywords: ['image', 'photo', 'picture']
    },
    {
      icon: Divide,
      label: 'Divider',
      description: 'Add a horizontal line',
      action: 'add-divider',
      keywords: ['divider', 'line', 'separator']
    },
  ];

  // Filtrer les commandes en fonction du terme de recherche
  const filteredCommands = commands.filter(command => {
    const search = searchTerm.toLowerCase();
    return command.label.toLowerCase().includes(search) ||
           command.description.toLowerCase().includes(search) ||
           command.keywords.some(keyword => keyword.includes(search));
  });

  // Gérer la navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            onSelect(filteredCommands[selectedIndex].action);
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredCommands, onSelect, onClose]);

  // Focus sur l'input au montage
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      ref={menuRef}
      className="fixed bg-white shadow-lg rounded-lg border min-w-[300px] z-50"
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px` 
      }}
    >
      <div className="p-2 border-b">
        <Input
          ref={inputRef}
          placeholder="Type a command..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedIndex(0);
          }}
          className="w-full"
        />
      </div>
      
      <div className="max-h-[300px] overflow-y-auto py-2">
        {filteredCommands.map((command, index) => (
          <div
            key={command.action}
            className={`px-4 py-2 flex items-center gap-3 cursor-pointer ${
              index === selectedIndex ? 'bg-slate-100' : 'hover:bg-slate-50'
            }`}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              onSelect(command.action);
              onClose();
            }}
          >
            <command.icon className="h-4 w-4 text-slate-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{command.label}</div>
              <div className="text-xs text-slate-500 truncate">
                {command.description}
              </div>
            </div>
          </div>
        ))}
        
        {filteredCommands.length === 0 && (
          <div className="px-4 py-2 text-sm text-slate-500 text-center">
            No commands found
          </div>
        )}
      </div>
    </div>
  );
}