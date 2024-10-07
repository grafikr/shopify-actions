import * as core from '@actions/core';
import fs from 'fs-extra';
import config from '../../helpers/config';
import { BUILD_DIR, THEME_KIT_ENVIRONMENT } from '../../inputs';
import { getIgnoredAssets } from '../../helpers/shopify';

export default async (): Promise<void> => {
  const environment = config[THEME_KIT_ENVIRONMENT];
  const themeId = parseInt(environment.theme_id, 10);
  const ignoredFiles = environment.ignore_files;
  const directory = environment.directory ?? './';

  // Copy existing source directory
  core.info(`Copying directory "${directory}" to "${BUILD_DIR}"`);

  fs.emptyDirSync(BUILD_DIR);
  fs.copySync(directory, BUILD_DIR, {
    filter: (src) => {
      core.info(`Src: ${src}`)

      return !src.includes('node_modules')
    },
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
