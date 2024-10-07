import * as core from '@actions/core';
import fs from 'fs-extra';
import path from 'path';
import config from '../../helpers/config';
import { BUILD_DIR, THEME_KIT_ENVIRONMENT } from '../../inputs';
import { getIgnoredAssets, themeDirectories } from '../../helpers/shopify';

export default async (): Promise<void> => {
  const environment = config[THEME_KIT_ENVIRONMENT];
  const themeId = parseInt(environment.theme_id, 10);
  const ignoredFiles = environment.ignore_files;
  const directory = environment.directory ?? './';

  if (themeDirectories.includes(BUILD_DIR)) {
    core.error(
      'BUILD_DIR cannot be the same as one of the default Shopify theme directories',
    );
  }

  // Copy existing source directory
  core.info(`Copying directory "${directory}" to "${BUILD_DIR}"`);

  fs.emptyDirSync(BUILD_DIR);
  themeDirectories.forEach((themeDirectory) => {
    fs.copySync(
      path.join(directory, themeDirectory),
      path.join(BUILD_DIR, themeDirectory),
      {
        filter: (src) => !src.includes('node_modules'),
      },
    );
  });

  // Copy ignored files from environment
  if (environment.ignore_files) {
    const assets = await getIgnoredAssets(themeId, ignoredFiles);

    assets.forEach((asset) => {
      core.info(`Copying asset with key "${asset.key}" to "${BUILD_DIR}"`);

      fs.outputFileSync(`${BUILD_DIR}/${asset.key}`, asset.value);
    });
  }
};
