import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function EmailsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Addresses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">example@email.com</p>
                <Badge>Primary</Badge>
                <Badge variant="secondary">Verified</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Added on Jan 1, 2024</p>
            </div>
            <Button variant="destructive">Remove</Button>
          </div>

          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Add email address</h3>
            <div className="flex gap-2">
              <Input placeholder="Enter email address" type="email" />
              <Button>Add</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
