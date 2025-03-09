'use client';

import { Check, Copy, Download } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface RecoveryCodesProps {
  codes: string[];
}

export function RecoveryCodes({ codes }: RecoveryCodesProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyAllCodes = () => {
    navigator.clipboard.writeText(codes.join('\n'));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadCodes = () => {
    const element = document.createElement('a');
    const file = new Blob([codes.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'recovery-codes.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {codes.map((code, index) => (
          <div key={index} className="font-mono text-sm p-2 bg-muted rounded-md">
            {code}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={copyAllCodes} className="flex-1">
          {isCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copié
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copier tous les codes
            </>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={downloadCodes} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Télécharger
        </Button>
      </div>
    </div>
  );
}
