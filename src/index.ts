import * as core from '@actions/core';
import fs from 'fs';
import { ACTION } from './inputs';
import Deploy from './actions/deploy';
import Preview from './actions/preview';
import Delete from './actions/delete';

const run = async () => {
  if (fs.existsSync('./config.yml')) {
    fs.readFileSync('./config.yml', 'utf8');
  } else {
    throw new Error('"config.yml" was not found. No commands has been run.');
  }

  switch (ACTION) {
    case 'DEPLOY':
      return Deploy();

    case 'PREVIEW':
      return Preview();

    case 'DELETE':
      return Delete();

    default:
      throw TypeError(`ACTION: "${ACTION} is not a valid action.`);
  }
};

run().catch((e: Error) => {
  core.setFailed(e);
});
