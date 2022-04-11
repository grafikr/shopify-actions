import themeKit from '@shopify/themekit';
import { BUILD_DIR, THEME_KIT_ENVIRONMENT } from '../inputs';
import config from './config';

const environment = config[THEME_KIT_ENVIRONMENT];

export const isThemeKitToken = (token: string): boolean => token.startsWith('shptka_');

export const themeKitBaseURL = () => 'https://theme-kit-access.shopifyapps.com/cli/admin/api/2022-04/';

export const shopifyBaseURL = (store: string) => `https://${store}/admin/api/2022-04/`;

export const deploy = async (themeID: number) => {
  await themeKit.command('deploy', {
    noIgnore: true,
    dir: BUILD_DIR,
    password: environment.password,
    themeid: themeID.toString(),
    store: environment.store,
  });
};
