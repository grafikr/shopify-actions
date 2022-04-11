import * as github from '@actions/github';
import * as core from '@actions/core';
import { GITHUB_TOKEN } from '../inputs';

const octokit = github.getOctokit(GITHUB_TOKEN);
const { context } = github;

export const getExistingComment = async () => {
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

export const getExistingThemeIDFromComments = async (): Promise<number | null> => {
  const comment = await getExistingComment();

  core.info(JSON.stringify(comment));

  if (comment) {
    core.info(parseThemeID(comment).toString());
    return parseThemeID(comment);
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

export const updateComment = async (commentID: number, body: string) => {
  octokit.rest.issues.updateComment({
    ...context.repo,
    issue_number: context.payload.pull_request.number,
    comment_id: commentID,
    body,
  });
};
