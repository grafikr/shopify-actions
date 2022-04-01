import Shopify, { DataType } from '@shopify/shopify-api';
import { SHOPIFY_ACCESS_TOKEN, SHOPIFY_ENVIRONMENT, SHOPIFY_STORE } from '../inputs';
import config from './config';

type Theme = {
  id: number
  name: string
  created_at: string
  updated_at: string
  role: 'main' | 'unpublished' | 'demo' | 'development'
  theme_store_id: number
  previewable: boolean
  processing: boolean
};

type Asset = {

};

const client = new Shopify.Clients.Rest(SHOPIFY_STORE, SHOPIFY_ACCESS_TOKEN);

export const getThemeAssets = async (id: number) => {
  const data = await client.get({
    path: `themes/${id}/assets`,
  }).then((response) => response.body) as { assets: Asset[] };

  return data.assets;
};

export const createTheme = async () => {
  const assets = await getThemeAssets(parseInt(config[SHOPIFY_ENVIRONMENT].theme_id, 10));

  // TODO: Download everything ignored from live theme
  // TODO: Zip theme
  // TODO: Upload to server. ngrok/http-server?

  return client.post({
    path: 'themes',
    data: {
      theme: {
        name: 'Lemongrass',
        src: 'https://themes.shopify.com/theme.zip',
        role: 'development',
      },
    },
    type: DataType.JSON,
  });
};
