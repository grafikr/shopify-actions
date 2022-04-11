import * as core from '@actions/core';
import { deleteTheme } from '../helpers/shopify';
import { getExistingThemeIDFromComments } from '../helpers/github';

export default async () => {
  try {
    const themeID = await getExistingThemeIDFromComments();

    if (themeID) {
      await deleteTheme(themeID);
    }
  } catch (error) {
    if (error.response.status !== 404) {
      core.setFailed(error.message);
    }
  }
};
