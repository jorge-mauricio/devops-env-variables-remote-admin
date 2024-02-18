'use strict';

import fs from 'fs';
import path from 'path';
import { getEnvFiles } from './getEnvFiles';

// jest.mock('fs');
// jest.mock('path');

// Instructions: npx jest getEnvFiles.test.ts
// Force delete (git bash): rm -rf node_modules

describe('getEnvFiles', () => {
  it('should return an array of filenames that start with .env', () => {
    const mockReaddirSync = jest.fn().mockReturnValue(['.env', '.env.local', '.env.development']);
    fs.readdirSync = mockReaddirSync;
    // (path.join as jest.Mock).mockReturnValue('mocked_path');
    // (fs.readdirSync as jest.Mock).mockReturnValue(['.env', '.env.example', 'file.txt']);

    const result = getEnvFiles();

    expect(result).toEqual(['.env', '.env.local', '.env.development']);
  });

  it('should return null if no .env files are found', () => {
    const mockReaddirSync = jest.fn().mockReturnValue(['package.json', 'tsconfig.json']);
    fs.readdirSync = mockReaddirSync;
    // (path.join as jest.Mock).mockReturnValue('mocked_path');
    // (fs.readdirSync as jest.Mock).mockReturnValue(['package.json', 'tsconfig.json']);

    const result = getEnvFiles();

    expect(result).toBeNull();
  });
});
