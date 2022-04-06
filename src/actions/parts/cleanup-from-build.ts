import fs from 'fs-extra';

export default async (buildDir) => {
  await fs.remove(buildDir);
};
