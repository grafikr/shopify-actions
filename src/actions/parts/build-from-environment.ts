import * as core from '@actions/core';
import path from 'path';
import fs from 'fs-extra';
import archiver from 'archiver';
import config from '../../helpers/config';
import { BUILD_DIR, THEME_KIT_ENVIRONMENT } from '../../inputs';
import { getIgnoredAssets } from '../../helpers/shopify';

export default async (): Promise<string> => {
  const environment = config[THEME_KIT_ENVIRONMENT];
  const themeId = parseInt(environment.theme_id, 10);
  const ignoredFiles = environment.ignore_files;

  // Copy existing source directory
  core.info(`Copying directory "${environment.directory} to "${BUILD_DIR}`);

  fs.emptyDirSync(BUILD_DIR);
  fs.copySync(environment.directory, BUILD_DIR, {
    filter: (src) => !src.includes('node_modules'),
  });

  // Copy ignored files from environment
  if (environment.ignore_files) {
    const assets = await getIgnoredAssets(themeId, ignoredFiles);

    assets.forEach((asset) => {
      core.info(`Copying asset with key "${asset.key} to ${BUILD_DIR}`);

      fs.outputFileSync(`${BUILD_DIR}/${asset.key}`, asset.value);
    });
  }

  // Zip build directory
  core.info(`Creating zip file from directory "${BUILD_DIR}"`);

  const zip = fs.createWriteStream('build.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(zip);

  archive.directory(BUILD_DIR, false);
  await archive.finalize();

  return path.resolve('build.zip');
};
