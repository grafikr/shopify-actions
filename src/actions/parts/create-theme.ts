import * as core from '@actions/core';
import themeKit from '@shopify/themekit';
import { createTheme } from '../../helpers/shopify';
import { ThemeRole } from '../../types/shopify';
import { BUILD_DIR, THEME_KIT_ENVIRONMENT } from '../../inputs';
import config from '../../helpers/config';

const environment = config[THEME_KIT_ENVIRONMENT];

export default async (data: { name: string, role: ThemeRole }): Promise<number> => {
  core.info('Creating theme...');
  const response = await createTheme({
    src: 'https://github.com/Shopify/dawn/archive/refs/heads/main.zip',
    ...data,
  });
  core.info(`Theme created with ID: ${response.theme.id}`);

  themeKit.command('deploy', {
    dir: BUILD_DIR,
    password: environment.password,
    store: environment.store,
    themeid: response.theme.id,
    noIgnore: true,
  });

  return response.theme.id;
};
