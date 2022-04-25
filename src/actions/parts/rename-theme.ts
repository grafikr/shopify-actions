import { updateTheme } from '../../helpers/shopify';

export default async (id: number, name: string) => {
  await updateTheme(id, {
    name,
  });
};
