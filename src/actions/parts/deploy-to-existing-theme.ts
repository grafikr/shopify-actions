import * as core from '@actions/core';
import { deploy } from '../../helpers/themekit';

export default async (themeID: number) => {
  core.info(`Deploying theme with ID "${themeID}"`);
  await deploy(themeID);
};
