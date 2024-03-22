import * as core from '@actions/core';
import fs from 'fs-extra';
import config from '../../helpers/config';
import { BUILD_DIR, THEME_KIT_ENVIRONMENT } from '../../inputs';
import { download } from '../../helpers/themekit';

export default async (): Promise<void> => {
  const environment = config[THEME_KIT_ENVIRONMENT];

  // Copy existing source directory
  core.info(`Copying directory "${environment.directory}" to "${BUILD_DIR}"`);

  fs.emptyDirSync(BUILD_DIR);
  fs.copySync(environment.directory, BUILD_DIR, {
    filter: (src) => !src.includes('node_modules'),
  });

  // Copy ignored files from environment
  if (environment.ignore_files) {
    let args = environment.ignore_files.join(' ');
    args += ` --no-ignore --dir="${BUILD_DIR}"`;

    await download(args);
  }
};
