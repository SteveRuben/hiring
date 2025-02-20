// app/api-keys/page.tsx
'use client';

import { ArrowLeft, Copy, RefreshCw, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ApiKeyManagementPage() {
  const [apiKey, setApiKey] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJbnRlcm5hbCI6YXRpb25hbCJZY29wZXJhdGlvbkJZY29ycCI'
  );
  const [apiKeyName, setApiKeyName] = useState('');
  const [allSelected, setAllSelected] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard
      .writeText(apiKey)
      .then(() => {
        showNotification('API key copied to clipboard', 'success');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy API key', 'error');
      });
  };

  const handleDeleteApiKey = () => {
    if (confirm('Are you sure you want to delete this API key?')) {
      setApiKey('');
      showNotification('API key deleted', 'success');
    }
  };

  const handleSelectAll = () => {
    setAllSelected(true);
  };

  const handleDeselectAll = () => {
    setAllSelected(false);
  };

  return (
    <div className="relative px-4 sm:px-0">
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-3 sm:p-4 text-sm sm:text-base rounded-md shadow-md z-50 max-w-xs sm:max-w-md ${
            notification.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {notification.message}
        </div>
      )}

      <Card className="w-full max-w-3xl mx-auto border border-gray-200">
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 shadow-sm bg-gray-200">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 font-bold text-purple-800" />
            </Button>
            <h1 className="text-lg sm:text-xl font-bold text-purple-900">API key</h1>
          </div>
          <Button variant="ghost" size="icon">
            <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
          </Button>
        </div>

        <CardContent className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Use API Key Section */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Use API key</h2>
            <div className="space-y-2">
              <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">
                API key
              </label>
              <Input
                id="api-key"
                value={apiKey}
                readOnly
                className="font-mono text-xs sm:text-sm break-all"
              />
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-3">
                <Button
                  onClick={handleCopyApiKey}
                  variant="outline"
                  className="flex items-center justify-center bg-white border-purple-200 text-purple-700 hover:bg-purple-50 text-sm w-full sm:w-auto"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={handleDeleteApiKey}
                  variant="outline"
                  className="flex items-center justify-center bg-white border-red-200 text-red-600 hover:bg-red-50 text-sm w-full sm:w-auto"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          {/* Edit API Key Section */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Edit API key</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="api-key-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <Input
                  id="api-key-name"
                  placeholder="Enter a name for this API key"
                  value={apiKeyName}
                  onChange={(e) => setApiKeyName(e.target.value)}
                  className="w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API restrictions
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleSelectAll}
                    variant="outline"
                    size="sm"
                    className={`text-xs sm:text-sm border-purple-200 ${
                      allSelected ? 'bg-purple-100 text-purple-800' : 'bg-white text-purple-700'
                    }`}
                  >
                    Select all
                  </Button>
                  <Button
                    onClick={handleDeselectAll}
                    variant="outline"
                    size="sm"
                    className={`text-xs sm:text-sm border-purple-200 ${
                      !allSelected ? 'bg-purple-100 text-purple-800' : 'bg-white text-purple-700'
                    }`}
                  >
                    Deselect all
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
