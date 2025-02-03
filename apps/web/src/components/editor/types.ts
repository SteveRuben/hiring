export interface Position {
  top: number;
  left: number;
}

export interface EditorCommand {
  icon: React.ComponentType;
  label: string;
  description: string;
  action: () => void;
}

export type EditorElement = {
  id: string;
  type: 'paragraph' | 'heading' | 'list' | 'code' | 'image';
  content: string;
  properties?: Record<string, any>;
};
