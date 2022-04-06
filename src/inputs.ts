import * as core from '@actions/core';

export const ACTION = core.getInput('ACTION', {
  required: true,
  trimWhitespace: true,
}) as 'PREVIEW' | 'DEPLOY' | 'DELETE';

export const THEME_KIT_ENVIRONMENT: string = core.getInput('THEME_KIT_ENVIRONMENT', {
  required: false,
  trimWhitespace: true,
}) ?? 'development';

export const SHOPIFY_THEME_ROLE: string = core.getInput('SHOPIFY_THEME_ROLE', {
  required: false,
  trimWhitespace: true,
}) ?? 'development' as 'PREVIEW' | 'DEPLOY' | 'DELETE';

export const GITHUB_TOKEN: string = core.getInput('GITHUB_TOKEN', {
  required: true,
});

export const BUILD_DIR: string = core.getInput('GITHUB_TOKEN', {
  required: false,
  trimWhitespace: true,
}) ?? 'build';
