import * as core from '@actions/core';
import { ThemeRole } from './types/shopify';

export const ACTION = core.getInput('ACTION', {
  required: true,
  trimWhitespace: true,
}) as 'PREVIEW' | 'DEPLOY' | 'DELETE';

export const THEME_KIT_ENVIRONMENT: string = core.getInput('THEME_KIT_ENVIRONMENT', {
  required: false,
  trimWhitespace: true,
}) || 'development';

export const SHOPIFY_THEME_ROLE = core.getInput('SHOPIFY_THEME_ROLE', {
  required: false,
  trimWhitespace: true,
}) as ThemeRole || 'development';

export const GITHUB_TOKEN: string = core.getInput('GITHUB_TOKEN', {
  required: true,
});

export const BUILD_DIR: string = core.getInput('GITHUB_TOKEN', {
  required: false,
  trimWhitespace: true,
}) ?? 'build';
