import { jwtDecode } from 'jwt-decode';

import { User } from '@/model';
import { useUserStore } from '@/model/user.store';

// API Functions
const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001/v1' : 'http://localhost:3001/v1';

export const api = async <T>({
  method = 'GET',
  url,
  body,
  token = '',
}: {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  body?: any;
  token?: string;
}): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: {
      'X-Requested-With': 'XmlHttpRequest',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const res = await fetch(`${BASE_URL}${url}`, options);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'An error occurred');
  }

  return res.json();
};

export const loginWithTokenResponse = async (auth: User['auth']) => {
  if (!auth.accessToken) return;

  const userId = jwtDecode<{ id: number }>(auth.accessToken).id;

  const details = await api<User['details']>({
    method: 'GET',
    url: `/users/${userId}`,
    token: auth.accessToken,
  });

  const memberships = await api<User['memberships']>({
    method: 'GET',
    url: `/users/${userId}/memberships`,
    token: auth.accessToken,
  });

  const newUser = { details, memberships, auth };

  useUserStore.setState((state) => ({
    users: [...state.users, newUser].filter(
      (v, i, a) => a.findIndex((u) => u.details.id === v.details.id) === i
    ),
    activeUserIndex: state.users.length,
  }));
};
