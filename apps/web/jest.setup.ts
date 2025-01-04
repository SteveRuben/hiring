// jest.setup.ts
import '@testing-library/jest-dom';

// Extend expect matchers
expect.extend({
  // Add custom matchers here if needed
});

// Mock window properties that aren't available in JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Add fetch mock if needed
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
    statusText: 'OK',
  } as Response)
);

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});