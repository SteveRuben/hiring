'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const api = {
    get: async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('API Error');
      return res.json();
    },
    patch: async (url: string, data: any) => {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('API Error');
      return res.json();
    },
  };


interface ProfileData {
  fullName: string;
  nickname: string;
  username: string;
  gender: string;
  country: string;
  timezone: string;
  profilePicture?: string;
}

const sidebarItems = [
  { title: 'Profile', href: '/account/profile', active: true },
  { title: 'Emails', href: '/account/emails' },
  { title: 'Password', href: '/account/password' },
  { title: 'Identities', href: '/account/identities' },
  { title: 'Sessions', href: '/account/sessions' },
];

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ProfileData>({
    fullName: '',
    nickname: '',
    username: '',
    gender: '',
    country: '',
    timezone: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const result = await api.get('/users/profile');
      setData(result);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (formData: ProfileData) => {
    try {
      await api.patch('/users/profile', formData);
      // Optionnel : Rafraîchir les données ou afficher une notification
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-900">
      {/* Header */}
      <header className="bg-purple-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-semibold">StartupName</div>
            <nav className="space-x-4">
              <a href="#" className="hover:text-gray-300">Settings</a>
              <a href="#" className="hover:text-gray-300">Teams</a>
              <a href="#" className="hover:text-gray-300">Developer</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-purple-800 rounded-full">
              <span className="sr-only">Messages</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <Image
                src={data.profilePicture || '/placeholder-avatar.png'}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{data.nickname}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-8 px-4">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-md ${
                    item.active
                      ? 'bg-white text-purple-900'
                      : 'text-white hover:bg-purple-800'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Account settings</h1>
              <button className="text-purple-600 hover:text-purple-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleProfileUpdate(Object.fromEntries(formData) as unknown as ProfileData);
              }}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    defaultValue={data.fullName}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                    Nickname
                  </label>
                  <input
                    type="text"
                    name="nickname"
                    id="nickname"
                    defaultValue={data.nickname}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    defaultValue={data.username}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    defaultValue={data.gender}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="PREFER_NOT_TO_SAY">Prefer not to say (them/their)</option>
                    <option value="MALE">Male (he/him)</option>
                    <option value="FEMALE">Female (she/her)</option>
                    <option value="NONBINARY">Non-binary (they/them)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      defaultValue={data.country}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                      Timezone
                    </label>
                    <input
                      type="text"
                      name="timezone"
                      id="timezone"
                      defaultValue={data.timezone}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}