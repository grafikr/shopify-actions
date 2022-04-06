import fs from 'fs-extra';
import config from '../../helpers/config';
import { BUILD_DIR, THEME_KIT_ENVIRONMENT } from '../../inputs';
import { getIgnoredAssets } from '../../helpers/shopify';

export default async () => {
  const environment = config[THEME_KIT_ENVIRONMENT];
  const themeId = parseInt(environment.theme_id, 10);
  const ignoredFiles = environment.ignore_files;

  // Copy existing source directory
  fs.emptyDirSync(BUILD_DIR);
  fs.copySync(environment.directory, BUILD_DIR, {
    filter: (src) => !src.includes('node_modules'),
  });

  // Copy ignored files from environment
  if (environment.ignore_files) {
    const assets = await getIgnoredAssets(themeId, ignoredFiles);

    assets.forEach((asset) => {
      fs.outputFileSync(`${BUILD_DIR}/${asset.key}`, asset.value);
    });
  }
};
