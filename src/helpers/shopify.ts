import axios from 'axios';
import { THEME_KIT_ENVIRONMENT } from '../inputs';
import transformPattern from './transformPattern';
import {
  Asset, Theme, CreateTheme, UpdateTheme,
} from '../types/shopify';
import config from './config';
import { isThemeKitToken, shopifyBaseURL, themeKitBaseURL } from './themekit';

const environment = config[THEME_KIT_ENVIRONMENT];

// https://github.com/Shopify/themekit/blob/master/src/httpify/client.go#L107
const isThemeKitEnvironment = isThemeKitToken(environment.password);

const client = axios.create({
  baseURL: isThemeKitEnvironment
    ? themeKitBaseURL()
    : shopifyBaseURL(environment.store),
  headers: {
    'X-Shopify-Access-Token': environment.password,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...isThemeKitEnvironment ? {
      'X-Shopify-Shop': environment.store,
    } : {},
  },
});

export const getTheme = async (id: number): Promise<Theme | null> => client.get(`themes/${id}.json`)
  .then((response) => response.data as Theme)
  .catch(() => null);

export const updateTheme = async (id: number, data: UpdateTheme): Promise<Theme> => client.put(`themes/${id}.json`, { theme: data })
  .then((response) => response.data as Theme);

export const createTheme = async (data: CreateTheme) => client.post('themes.json', {
  theme: data,
}).then((response) => response.data as { theme: Theme });

export const deleteTheme = async (id: number) => client.delete(`themes/${id}.json`);

export const getThemeAssets = async (id: number) => {
  const response = await client.get(`themes/${id}/assets.json`);

  return response.data.assets as Asset[];
};

export const getAsset = async (theme_id: number, key: string) => {
  const response = await client.get(`themes/${theme_id}/assets.json`, {
    params: { 'asset[key]': key },
  });

  return response.data.asset as Asset;
};

export const getIgnoredAssets = async (id: number, patterns: string[]) => {
  const assets = (await getThemeAssets(id)).filter((asset) => {
    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = transformPattern(patterns[i]);

      if (asset.key.match(new RegExp(pattern, 'g'))) return true;
    }

    return false;
  });

  const promises = [];
  assets.forEach((asset) => {
    const promise = getAsset(id, asset.key);

    promises.push(promise);
  });

  return Promise.all(promises);
};

export const getPreviewURL = (id: number) => `https://${environment.store}?preview_theme_id=${id}`;

export const getCustomizeURL = (id: number) => `https://${environment.store}/admin/themes/${id}/editor`;
