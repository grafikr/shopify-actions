import * as core from '@actions/core';
import themeKit from '@shopify/themekit';
import path from 'path';
import { BUILD_DIR, THEME_KIT_ENVIRONMENT } from '../inputs';
import config from './config';
import parseArgs from './parse-args';

const environment = config[THEME_KIT_ENVIRONMENT];

export const isThemeKitToken = (token: string): boolean =>
  token.startsWith('shptka_');

export const themeKitBaseURL = () =>
  'https://theme-kit-access.shopifyapps.com/cli/admin/api/2024-07/';

export const shopifyBaseURL = (store: string) =>
  `https://${store}/admin/api/2024-07/`;

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
    await themeKit.command('deploy', parseArgs(args));
  } catch (e) {
    core.info('Theme Kit returned an error while deploying');
    core.info(e);
  }
};
