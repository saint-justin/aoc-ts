import fs from 'fs/promises';

// Helper function to read in a file async
export default async (path: string) => {
  try {
    return await fs.readFile(path, { encoding: 'utf8' });
  } catch (e) {
    console.error(e);
  }
}