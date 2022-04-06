import fs from 'fs-extra';

export default async (buildDir, zipFilePath) => {
  await fs.remove(buildDir);
  await fs.remove(zipFilePath);
};
