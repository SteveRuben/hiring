// app/team/page.tsx
'use client';

import { RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  joinedDate: string;
  isCurrentUser?: boolean;
  avatarUrl?: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Anand Chowdhary',
      role: 'Owner',
      joinedDate: '14 days ago',
      isCurrentUser: true,
      avatarUrl: '/images/image.png',
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to invite the user
    console.log('Inviting new member:', newMember);
    setNewMember({ name: '', email: '' });
  };

  return (
    <Card className="max-w-8xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl">Team</CardTitle>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Team Members List */}
          <Card className="shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition duration-150"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-purple-900">{member.name}</span>
                          <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">
                            YOU
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">Added {member.joinedDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                        {member.role}
                      </span>
                      <button className="text-gray-400 hover:text-red-500 rounded-full p-1 hover:bg-gray-100 transition duration-150">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Invite Form */}
          <div>
            <h3 className="text-lg  mb-4 text-[#240f4d] font-bold">Invite another member</h3>
            <p className="text-sm text-gray-500 mb-4">
              Use this form to invite another user from your team to this organization.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter new user's full name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter new user's email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send invitation
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
