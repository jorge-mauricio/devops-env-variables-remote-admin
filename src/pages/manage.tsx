'use-strict';
import Image from "next/image";
import { GetServerSideProps } from 'next';
import { Inter } from "next/font/google";
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography, SelectChangeEvent } from "@mui/material";

import { getEnvFiles } from '../utils/helpers/getEnvFiles';

const inter = Inter({ subsets: ["latin"] });

// Define a type for the props
interface ManagePageProps {
  envFiles: string[] | null;
}

const ManagePage: React.FC<ManagePageProps> = ({ envFiles }) => {
  // States
  const defaultEnvFile = envFiles ? (envFiles.includes('.env') ? '.env' : envFiles[0]) : '';
  const [selectedEnvFile, setSelectedEnvFile] = React.useState<string>(defaultEnvFile);

  // Handlers
  const handleEnvFileChange = (event: SelectChangeEvent<string>) => {
    setSelectedEnvFile(event.target.value as string);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Manage
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center w-full">
        <FormControl fullWidth>
          <Typography id="env-file-label" component="label" htmlFor="env-file" className="mb-2">
            Select the .env file reference:
          </Typography>
          {envFiles ? (
            <Select
              labelId="env-file-label"
              id="env-file"
              value={selectedEnvFile || ''}
              onChange={handleEnvFileChange}
            >
              {envFiles && envFiles.map((envFile) => (
                <MenuItem key={envFile} value={envFile}>{envFile}</MenuItem>
              ))}
            </Select>
            ) : (
              <Typography variant="body1" component="p" className="text-red-500 font-bold">
                No .env files found in your project. Check the root directory, create an .env file and try again.
              </Typography>
            )}
        </FormControl>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        Footer
      </div>
    </main>
  );
};

/**
 * Fetches the server-side properties for the ManagePage component.
 *
 * @returns {Promise<GetServerSidePropsResult<ManagePageProps>>} An object that includes the `envFiles` prop.
 */
export const getServerSideProps: GetServerSideProps<ManagePageProps> = async () => {
  
  const envFiles = getEnvFiles();

  return {
    props: {
      envFiles,
    },
  };
};

export default ManagePage;
