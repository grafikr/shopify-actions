import fs from 'fs';
import * as core from '@actions/core';
import * as github from '@actions/github';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  AWS_S3_REGION,
  AWS_S3_BUCKET,
  AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_ACCESS_KEY_ID,
} from '../../inputs';
import { createTheme } from '../../helpers/shopify';
import { ThemeRole } from '../../types/shopify';

export default async (
  path: string,
  data: { name: string; role: ThemeRole },
): Promise<number> => {
  const { context } = github;

  core.info('Creating theme from ZIP file');

  const s3 = new S3Client({
    region: AWS_S3_REGION,
    credentials: {
      accessKeyId: AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    },
  });

  const input = {
    Bucket: AWS_S3_BUCKET,
    Key: `${context.repo.owner}/${context.repo.repo}/${context.ref}.zip`,
    Body: fs.createReadStream(path),
  };

  const putObject = new PutObjectCommand(input);
  const getObject = new GetObjectCommand(input);
  const deleteObject = new DeleteObjectCommand(input);

  await s3.send(putObject);
  const src = await getSignedUrl(s3, getObject);

  // Send create theme request
  core.info('Creating theme');
  const response = await createTheme({
    src,
    ...data,
  }).finally(async () => {
    // Delete zip
    await s3.send(deleteObject);
  });

  return response.theme.id;
};
