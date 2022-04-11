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

  core.info(JSON.stringify(comments));

  return comments.data.find((comment) => comment.body_text.startsWith('Theme created'));
};

export const createComment = async (body: string) => octokit.rest.issues.createComment({
  ...context.repo,
  issue_number: context.payload.pull_request.number,
  body,
});

export const updateComment = async (commentID: number, body: string) => {
  octokit.rest.issues.updateComment({
    ...context.repo,
    issue_number: context.payload.pull_request.number,
    comment_id: commentID,
    body,
  });
};
