import * as core from '@actions/core';

export const ACTION = core.getInput('ACTION', {
  required: true,
  trimWhitespace: true,
}) as 'PREVIEW' | 'DEPLOY' | 'DELETE';

export const SHOPIFY_STORE: string = core.getInput('SHOPIFY_STORE', {
  required: true,
  trimWhitespace: true,
});

export const SHOPIFY_ACCESS_TOKEN: string = core.getInput('SHOPIFY_ACCESS_TOKEN', {
  required: true,
  trimWhitespace: true,
});

export const GITHUB_TOKEN: string = core.getInput('GITHUB_TOKEN', {
  required: false,
});

export const SHOPIFY_ENVIRONMENT: string = core.getInput('SHOPIFY_ENVIRONMENT', {
  required: false,
  trimWhitespace: true,
}) ?? 'development';
