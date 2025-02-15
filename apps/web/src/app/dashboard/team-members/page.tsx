'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Plus, Trash2, User, UserPlus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslation } from '@/components/i18n';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InviteMemberInput, inviteMemberSchema } from '@/lib/validations/inviteMember';

const TeamMembersInterface = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema),
  });
  const currentUser = 'Jane Doe';

  const members = [
    {
      id: 1,
      name: 'Jane Doe',
      role: 'Admin',
      avatar: '/placeholder.svg?height=40&width=40',
      addedDays: 365,
    },
    {
      id: 2,
      name: 'John Smith',
      role: 'Developer',
      avatar: '/placeholder.svg?height=40&width=40',
      addedDays: 120,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      role: 'Designer',
      avatar: '/placeholder.svg?height=40&width=40',
      addedDays: 45,
    },
    {
      id: 4,
      name: 'Robert Williams',
      role: 'Product Manager',
      avatar: '/placeholder.svg?height=40&width=40',
      addedDays: 7,
    },
    {
      id: 5,
      name: 'Alice Johnson',
      role: 'Designer',
      avatar: '/placeholder.svg?height=40&width=40',
      addedDays: 45,
    },
    {
      id: 6,
      name: 'Alice Johnson',
      role: 'Designer',
      avatar: '/placeholder.svg?height=40&width=40',
      addedDays: 45,
    },
    {
      id: 7,
      name: 'Alice Johnson',
      role: 'Designer',
      avatar: '/placeholder.svg?height=40&width=40',
      addedDays: 45,
    },
  ];

  const toggleInviteForm = () => {
    setShowInviteForm(!showInviteForm);
  };

  const onSubmit = async (data: InviteMemberInput) => {
    try {
      router.push('/dashboard/team-members');
      router.refresh();
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section with Logo and Title */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-900">Team Members</h1>
            <p className="mt-2 text-gray-600">Manage your team and access permissions</p>
          </div>
          <Button
            onClick={toggleInviteForm}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm"
            disabled={isSubmitting}
          >
            {showInviteForm ? (
              <>
                <X size={16} className="mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Plus size={16} className="mr-2" />
                Add Member
              </>
            )}
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {showInviteForm ? (
            /* Invite Form with Validation */
            <Card className="shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">
                  Invite a new team member
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Team members will be able to access all projects and settings.
                </p>

                <form className="space-y-5">
                  <div>
                    <Label htmlFor="Fullname">{t('auth.signin.name')}</Label>
                    <Input
                      {...register('name')}
                      id="name"
                      type="name"
                      placeholder={t('auth.signin.namePlaceholder')}
                      required
                      autoCapitalize="none"
                      autoComplete="name"
                      autoCorrect="off"
                      className={`w-full px-4 py-3 rounded-md border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">{t('auth.signin.email')}</Label>
                    <Input
                      {...register('email')}
                      id="email"
                      type="email"
                      placeholder={t('auth.signin.emailPlaceholder')}
                      required
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className={`w-full px-4 py-3 rounded-md border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="flex space-x-4 pt-2">
                    <Button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm rounded-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <UserPlus size={16} className="mr-2" />
                          Send Invitation
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={toggleInviteForm}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Members List */
            <Card className="shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 transition duration-150"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarImage src={member.avatar} alt={member.name} />
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-purple-900">{member.name}</span>
                            {member.name === currentUser && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            Added {member.addedDays} {member.addedDays === 1 ? 'day' : 'days'} ago
                          </div>
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
          )}

          {/* Alert - always visible */}
          <Alert className="bg-purple-50 border border-purple-100 rounded-lg shadow-sm">
            <User className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-sm text-purple-800">
              {showInviteForm
                ? 'Invited members will receive an email with instructions to join your team.'
                : "You can invite new team members by clicking the 'Add Member' button."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default TeamMembersInterface;
