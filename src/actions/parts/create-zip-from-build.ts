import * as core from '@actions/core';
import fs from 'fs-extra';
import archiver from 'archiver';
import path from 'path';
import { BUILD_DIR } from '../../inputs';

export default async (): Promise<string> => {
  return new Promise(async (resolve) => {
    core.info(`Creating zip file from directory "${BUILD_DIR}"`);

    const zip = fs.createWriteStream('build.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(zip);

    zip.on('close', () => {
      resolve(path.resolve('build.zip'));
    });

    archive.directory(BUILD_DIR, false);
    await archive.finalize();
  });
};
