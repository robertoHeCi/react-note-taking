import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from './mocks/server/server';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());