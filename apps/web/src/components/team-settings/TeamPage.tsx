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
    <div className="w-full px-4 sm:px-6 md:px-8 py-0">
      <Card className="w-full mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 sm:px-6 py-4">
          <CardTitle className="text-2xl sm:text-3xl text-purple-950">Team</CardTitle>
          <Button variant="ghost" size="icon" className="self-end sm:self-auto">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 py-4">
          <div className="space-y-8">
            {/* Team Members List */}
            <Card className="shadow-md overflow-hidden border border-gray-200">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 transition duration-150 gap-3"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-purple-900">{member.name}</span>
                            {member.isCurrentUser && (
                              <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">Added {member.joinedDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 mt-2 sm:mt-0">
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
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
              <h3 className="text-lg mb-4 text-[#240f4d] font-bold">Invite another member</h3>
              <p className="text-sm text-gray-500 mb-6">
                Use this form to invite another user from your team to this organization.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter new user's full name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter new user's email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button type="submit" className="w-full sm:w-auto">
                    Send invitation
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
