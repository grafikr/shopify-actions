import * as core from '@actions/core';
import * as github from '@actions/github';
import { BUILD_DIR, SHOPIFY_THEME_ROLE } from '../inputs';
import { getCustomizeURL, getPreviewURL } from '../helpers/shopify';
import buildFromEnvironment from './parts/build-from-environment';
import uploadZip from './parts/upload-zip';
import { createComment } from '../helpers/github';
import cleanupFromBuild from './parts/cleanup-from-build';

export default async () => {
  try {
    const themeData = {
      name: `[PR] ${github.context.eventName}`,
      role: SHOPIFY_THEME_ROLE,
    };

    const zipFilePath = await buildFromEnvironment();
    const themeID = await uploadZip(zipFilePath, themeData);
    await cleanupFromBuild(BUILD_DIR, zipFilePath);

    const previewURL = getPreviewURL(themeID);
    const customizeURL = getCustomizeURL(themeID);

    await createComment(`#### Theme preview
A theme was automatically created for this issue.

Preview URL: [${previewURL}](${previewURL})
Customize URL: [${customizeURL}](${customizeURL})`);

    core.setOutput('SHOPIFY_THEME_ID', themeID);
    core.setOutput('SHOPIFY_THEME_PREVIEW_URL', previewURL);
    core.setOutput('SHOPIFY_THEME_CUSTOMIZE_URL', customizeURL);
  } catch (error) {
    core.setFailed(error.message);
  }
};
