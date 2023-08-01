import * as core from '@actions/core';
import { BUILD_DIR, SHOPIFY_THEME_ROLE } from '../inputs';
import { getCustomizeURL, getPreviewURL, getTheme } from '../helpers/shopify';
import buildFromEnvironment from './parts/build-from-environment';
import uploadZip from './parts/upload-zip';
import {
  getIssue,
  createPreviewComment,
  deleteComment,
  getExistingComment,
  parseThemeID,
} from '../helpers/github';
import cleanup from './parts/cleanup';
import deployToExistingTheme from './parts/deploy-to-existing-theme';
import createZipFromBuild from './parts/create-zip-from-build';
import renameTheme from './parts/rename-theme';

export default async () => {
  try {
    let themeID: number;
    let previewURL: string;
    let customizeURL: string;

    await buildFromEnvironment();
    const comment = await getExistingComment();

    if (comment) {
      themeID = parseThemeID(comment);

      if ((await getTheme(themeID)) === null) {
        themeID = undefined;

        await deleteComment(comment.id);
      }
    }

    const issue = await getIssue();
    const themeName = `[PR] ${issue.data.title}`;

    if (themeID) {
      previewURL = getPreviewURL(themeID);
      customizeURL = getCustomizeURL(themeID);

      await renameTheme(themeID, themeName.substring(0, 50));
      await deployToExistingTheme(themeID);
    } else {
      const zipFilePath = await createZipFromBuild();
      themeID = await uploadZip(zipFilePath, {
        name: themeName.substring(0, 50),
        role: SHOPIFY_THEME_ROLE,
      });
      cleanup([zipFilePath]);

      previewURL = getPreviewURL(themeID);
      customizeURL = getCustomizeURL(themeID);

      await createPreviewComment(previewURL, customizeURL);
    }

    cleanup([BUILD_DIR]);

    core.setOutput('SHOPIFY_THEME_ID', themeID);
    core.setOutput('SHOPIFY_THEME_PREVIEW_URL', previewURL);
    core.setOutput('SHOPIFY_THEME_CUSTOMIZE_URL', customizeURL);
  } catch (error) {
    core.setFailed(error.message);
  }
};
