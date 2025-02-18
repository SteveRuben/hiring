import { Monitor, Smartphone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SessionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 h-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5" />
              <div>
                <p className="font-medium">Chrome on Windows</p>
                <p className="text-sm text-muted-foreground">Active now • New York, USA</p>
              </div>
            </div>
            <Button variant="destructive">Revoke</Button>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5" />
              <div>
                <p className="font-medium">Safari on iPhone</p>
                <p className="text-sm text-muted-foreground">
                  Last active 2 hours ago • London, UK
                </p>
              </div>
            </div>
            <Button variant="destructive">Revoke</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
