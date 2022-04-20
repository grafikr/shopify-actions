import * as core from '@actions/core';
import { deployTheme } from '../../helpers/themekit';

export default async (themeID: number) => {
  core.info(`Deploying theme with ID "${themeID}"`);
  await deployTheme(themeID);
};
