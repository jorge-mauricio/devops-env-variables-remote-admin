'use strict';

import fs from 'fs';
import path from 'path';

/**
 * Reads the current working directory, filters for files that start with '.env'
 * and returns an array of these filenames.
 *
 * @returns {string[] | null} An array of filenames that start with '.env'.
 * @example const envFiles = getEnvFiles();
 */
const getEnvFiles = (): string[] | null => {
  const directory: string = path.join(process.cwd());
  const filenames: string[] = fs.readdirSync(directory);
  const envFiles: string[] = filenames.filter((filename) => filename.startsWith('.env'));

  if (envFiles.length === 0) {
    return null;
  }

  return envFiles;
};

export { getEnvFiles };
