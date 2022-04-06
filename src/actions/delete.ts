import * as core from '@actions/core';
import { deleteTheme } from '../helpers/shopify';

export default async () => {
  try {
    // TODO: Fetch theme id.
    await deleteTheme(123);
  } catch (error) {
    core.setFailed(error.message);
  }
};
