import * as core from '@actions/core';
import axios, { AxiosError } from 'axios';
import { THEME_KIT_ENVIRONMENT } from '../inputs';
import { Theme, CreateTheme, UpdateTheme } from '../types/shopify';
import themekitConfig from './config';
import { isThemeKitToken, shopifyBaseURL, themeKitBaseURL } from './themekit';

const environment = themekitConfig[THEME_KIT_ENVIRONMENT];

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
    ...(isThemeKitEnvironment
      ? {
          'X-Shopify-Shop': environment.store,
        }
      : {}),
  },
});

client.interceptors.response.use(undefined, (error: AxiosError) => {
  const { config, response } = error;

  if (!config) {
    return Promise.reject(error);
  }

  let delay: number;

  if (response) {
    if (response.status === 429) {
      delay = parseInt(response.headers['Retry-After'], 10) * 1000;
    } else if (response.status >= 500) {
      delay = 5000;
    } else {
      core.error(
        `Request to ${config.url} failed with status code ${response.status}`,
      );

      if (typeof response.data === 'string') {
        core.error(response.data);
      } else if (typeof response.data === 'object') {
        core.error(JSON.stringify(response.data));
      }

      return Promise.reject(error);
    }
  } else {
    return Promise.reject(error);
  }

  core.info('Retrying request...');

  const timeout = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });

  return timeout.then(() => axios(config));
});

export const getTheme = async (id: number): Promise<Theme | null> =>
  client
    .get(`themes/${id}.json`)
    .then((response) => response.data as Theme)
    .catch(() => null);

export const updateTheme = async (
  id: number,
  data: UpdateTheme,
): Promise<Theme> =>
  client
    .put(`themes/${id}.json`, { theme: data })
    .then((response) => response.data as Theme);

export const createTheme = async (data: CreateTheme) =>
  client
    .post('themes.json', {
      theme: data,
    })
    .then((response) => response.data as { theme: Theme });

export const deleteTheme = async (id: number) =>
  client.delete(`themes/${id}.json`);

export const getPreviewURL = (id: number) =>
  `https://${environment.store}?preview_theme_id=${id}`;

export const getCustomizeURL = (id: number) =>
  `https://${environment.store}/admin/themes/${id}/editor`;
