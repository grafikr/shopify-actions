import * as core from '@actions/core';
import { deleteTheme } from '../helpers/shopify';
import { getExistingComment, parseThemeID } from '../helpers/github';

export default async () => {
  try {
    const comment = await getExistingComment();

    if (comment) {
      const themeID = parseThemeID(comment);

      core.info(`Deleting theme with ID "${themeID}"`);
      await deleteTheme(themeID);
    }
  } catch (error) {
    if (error.response.status !== 404) {
      core.setFailed(error.message);
    }
  }
};
