export const mockUserData = {
  userId: 'user123',
  name: 'John Doe',
  email: 'john@example.com',
};

export const mockUserProgress: { [userId: string]: { [exerciseId: string]: boolean } } = {
  user123: {
    'array-sum': true,
    'array-filter': false,
    'string-reverse': false,
  },
};
