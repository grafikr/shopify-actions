import fs from 'fs-extra';

export default (paths: string[]) => {
  paths.forEach((path) => {
    fs.removeSync(path);
  });
};
