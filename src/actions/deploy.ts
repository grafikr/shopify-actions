import * as core from '@actions/core';
import { deploy } from '../helpers/themekit';
import { THEME_KIT_DEPLOY_COMMAND } from '../inputs';

export default async () => {
  try {
    await deploy(THEME_KIT_DEPLOY_COMMAND);
  } catch (error) {
    core.setFailed(error.message);
  }
};
