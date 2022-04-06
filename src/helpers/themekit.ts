export const isThemeKitToken = (token: string): boolean => token.startsWith('shptka_');

export const themeKitBaseURL = () => 'https://theme-kit-access.shopifyapps.com/cli/admin/api/2022-04/';

export const shopifyBaseURL = (store: string) => `https://${store}/admin/api/2022-04/`;
