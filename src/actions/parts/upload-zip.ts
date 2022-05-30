import http from 'http';
import fs from 'fs-extra';
import ngrok from 'ngrok';
import * as core from '@actions/core';
import { createTheme } from '../../helpers/shopify';
import { ThemeRole } from '../../types/shopify';

export default async (path: string, data: { name: string, role: ThemeRole }): Promise<number> => {
  core.info('Creating theme from ZIP file');

  // Start tunnel
  const server = http.createServer((request, response) => {
    const stat = fs.statSync(path);

    response.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Length': stat.size,
    });

    const stream = fs.createReadStream(path);
    stream.pipe(response);
  }).listen(8080);

  // Send create theme request
  const response = await createTheme({
    src: (await ngrok.connect(8080)).replace('https://', 'http://'),
    ...data,
  }).finally(async () => {
    // Close tunnel
    server.close();
    await ngrok.kill();
  });

  return response.theme.id;
};
