'use strict';

import fs from 'fs';
import { getEnvFiles } from './getEnvFiles';

// Instructions: npx jest getEnvFiles.test.ts
// Force delete (git bash): rm -rf node_modules

describe('getEnvFiles', () => {
  it('should return an array of filenames that start with .env', () => {
    const mockReaddirSync = jest.fn().mockReturnValue(['.env', '.env.local', '.env.development']);
    fs.readdirSync = mockReaddirSync;

    const result = getEnvFiles();

    expect(result).toEqual(['.env', '.env.local', '.env.development']);
  });

  it('should return null if no .env files are found', () => {
    const mockReaddirSync = jest.fn().mockReturnValue(['package.json', 'tsconfig.json']);
    fs.readdirSync = mockReaddirSync;

    const result = getEnvFiles();

    expect(result).toBeNull();
  });
});
