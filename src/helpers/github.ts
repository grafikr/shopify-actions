import * as github from '@actions/github';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';
import { GITHUB_TOKEN } from '../inputs';

const octokit = github.getOctokit(GITHUB_TOKEN);
const { context } = github;

export const getExistingComment = async (): Promise<RestEndpointMethodTypes['issues']['listComments']['response']['data'][0]> => {
  const comments = await octokit.rest.issues.listComments({
    ...github.context.repo,
    issue_number: context.payload.pull_request.number,
  });

  return comments.data.find((comment) => comment.user.login === 'github-actions[bot]' && comment.body?.startsWith('#### Theme preview'));
};

export const parseThemeID = (comment): number | null => {
  const parsed = comment.body.match(/preview_theme_id=([0-9]+)/);

  if (parsed[1]) {
    return parseInt(parsed[1], 10);
  }

  return null;
};

export const createPreviewComment = async (previewURL: string, customizeURL: string) => {
  const body = `#### Theme preview
A theme was automatically created for this issue.

Preview URL: [${previewURL}](${previewURL})
Customize URL: [${customizeURL}](${customizeURL})`;

  return octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: context.payload.pull_request.number,
    body,
  });
};

export const deleteComment = async (commentID: number) => octokit.rest.issues.deleteComment({
  ...context.repo,
  comment_id: commentID,
});
