import themeKit from '@shopify/themekit';
import argsParser from 'args-parser';
import path from 'path';
import { BUILD_DIR, THEME_KIT_ENVIRONMENT } from '../inputs';
import config from './config';

const environment = config[THEME_KIT_ENVIRONMENT];

export const isThemeKitToken = (token: string): boolean => token.startsWith('shptka_');

export const themeKitBaseURL = () => 'https://theme-kit-access.shopifyapps.com/cli/admin/api/2022-04/';

export const shopifyBaseURL = (store: string) => `https://${store}/admin/api/2022-04/`;

export const deployTheme = async (themeID: number) => {
  try {
    await themeKit.command('deploy', {
      noIgnore: true,
      dir: path.resolve(BUILD_DIR),
      password: environment.password,
      themeid: themeID.toString(),
      store: environment.store,
    });
  } catch (e) {
    // Do nothing
  }
};

export const deploy = async (args: string) => {
  try {
    const objectArgs = argsParser([
      'command',
      'file',
      args,
    ]);

    themeKit.command('deploy', objectArgs);
  } catch (e) {
    // Do nothing
  }
};
