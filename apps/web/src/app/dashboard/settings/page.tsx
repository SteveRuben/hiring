import { RefreshCw } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Account settings</CardTitle>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Image
              src="/images/image.png"
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-muted-foreground">Gravatar</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Full name</label>
            <Input defaultValue="Anand Chowdhary" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nickname</label>
            <Input defaultValue="Anand" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input defaultValue="anand" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <Select defaultValue="prefer-not">
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prefer-not">Prefer not to say (them/their)</SelectItem>
                <SelectItem value="male">Male (he/him)</SelectItem>
                <SelectItem value="female">Female (she/her)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                  <SelectItem value="pst">PST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
