import http from 'http';
import fs from 'fs-extra';
import ngrok from 'ngrok';
import { createTheme } from '../../helpers/shopify';
import { ThemeRole } from '../../types/shopify';
import { updateNgrokBinary } from '../../helpers/ngrok';

export default async (path: string, data: { name: string, role: ThemeRole }): Promise<number> => {
  // Start tunnel
  /* const server = http.createServer((request, response) => {
    const stat = fs.statSync(path);

    response.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Length': stat.size,
    });

    const stream = fs.createReadStream(path);
    stream.pipe(response);
  }).listen(8080); */

  console.log({ path, data });

  await updateNgrokBinary();

  try {
    const url = (await ngrok.connect(8080)).replace('https://', 'http://');
    console.log(url);
  } catch (error) {
    console.log({ error });

    throw error;
  }

  return 123;

/*
  // Send create theme request
  const response = await createTheme({
    src: (await ngrok.connect(8080)).replace('https://', 'http://'),
    ...data,
  });

  // Close tunnel
  server.close();
  server.emit('close');

  await ngrok.kill();

  return response.theme.id;
 */
};
