import * as core from '@actions/core';
import fs from 'fs-extra';
import config from '../../helpers/config';
import { BUILD_DIR, THEME_KIT_ENVIRONMENT } from '../../inputs';
import { getIgnoredAssets } from '../../helpers/shopify';

export default async (): Promise<void> => {
  const environment = config[THEME_KIT_ENVIRONMENT];
  const themeId = parseInt(environment.theme_id, 10);
  const ignoredFiles = environment.ignore_files;

  // Copy existing source directory
  core.info(`Copying directory "${environment.directory}" to "${BUILD_DIR}"`);

  fs.emptyDirSync(BUILD_DIR);
  fs.copySync(environment.directory, BUILD_DIR, {
    filter: (src) => !src.includes('node_modules'),
  });

  // Copy ignored files from environment
  if (environment.ignore_files) {
    let args = environment.ignore_files.map((arg) => `"${arg}"`).join(' ');
    args += ' --no-ignore';

    await download(args);
  }
};
