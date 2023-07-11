import * as core from '@actions/core';
import { ThemeRole } from './types/shopify';

export const ACTION = core.getInput('ACTION', {
  required: true,
  trimWhitespace: true,
}) as 'PREVIEW' | 'DEPLOY' | 'DELETE';

export const AWS_S3_REGION = core.getInput('AWS_S3_REGION', {
  required: false,
  trimWhitespace: true,
});

export const AWS_S3_BUCKET = core.getInput('AWS_S3_BUCKET', {
  required: false,
  trimWhitespace: true,
});

export const AWS_S3_ACCESS_KEY_ID = core.getInput('AWS_S3_ACCESS_KEY_ID', {
  required: false,
  trimWhitespace: true,
});

export const AWS_S3_SECRET_ACCESS_KEY = core.getInput('AWS_S3_SECRET_ACCESS_KEY', {
  required: false,
  trimWhitespace: true,
});

export const THEME_KIT_ENVIRONMENT: string =
  core.getInput('THEME_KIT_ENVIRONMENT', {
    required: false,
    trimWhitespace: true,
  }) || 'development';

export const THEME_KIT_DEPLOY_COMMAND: string = core.getInput(
  'THEME_KIT_DEPLOY_COMMAND',
  {
    required: false,
    trimWhitespace: true,
  },
);

export const SHOPIFY_THEME_ROLE =
  (core.getInput('SHOPIFY_THEME_ROLE', {
    required: false,
    trimWhitespace: true,
  }) as ThemeRole) || 'development';

export const GITHUB_TOKEN: string = core.getInput('GITHUB_TOKEN', {
  required: true,
});

export const BUILD_DIR: string =
  core.getInput('GITHUB_TOKEN', {
    required: false,
    trimWhitespace: true,
  }) || 'build';
