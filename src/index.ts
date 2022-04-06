import * as core from '@actions/core';
import { ACTION } from './inputs';
import Preview from './actions/preview';
import Delete from './actions/delete';

const run = async () => {
  switch (ACTION) {
    case 'DEPLOY':
      break;

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
