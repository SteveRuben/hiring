'use client';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  Italic,
  Link as LinkIcon,
  Underline,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FloatingMenuProps {
  position: { top: number; left: number };
  onFormatText: (format: string) => void;
  onAddLink: () => void;
  onAlign: (alignment: 'left' | 'center' | 'right') => void;
}

export function FloatingMenu({ position, onFormatText, onAddLink, onAlign }: FloatingMenuProps) {
  return (
    <div
      className="fixed bg-white shadow-lg rounded-lg border p-1 flex items-center gap-1 transform -translate-x-1/2 z-50"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* Text Formatting */}
      <div className="flex items-center gap-0.5 border-r pr-0.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFormatText('bold')}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFormatText('italic')}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFormatText('underline')}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      {/* Code and Highlight */}
      <div className="flex items-center gap-0.5 border-r pr-0.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFormatText('code')}
          className="h-8 w-8 p-0"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFormatText('highlight')}
          className="h-8 w-8 p-0"
        >
          <Highlighter className="h-4 w-4" />
        </Button>
      </div>

      {/* Alignment */}
      <div className="flex items-center gap-0.5 border-r pr-0.5">
        <Button variant="ghost" size="sm" onClick={() => onAlign('left')} className="h-8 w-8 p-0">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onAlign('center')} className="h-8 w-8 p-0">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onAlign('right')} className="h-8 w-8 p-0">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Link */}
      <Button variant="ghost" size="sm" onClick={onAddLink} className="h-8 w-8 p-0">
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
