import http from 'http';
import fs from 'fs-extra';
import ngrok from 'ngrok';
import { createTheme } from '../../helpers/shopify';
import { ThemeRole } from '../../types/shopify';

export default async (path: string, config: { name: string, role: ThemeRole }): Promise<number> => {
  // Start tunnel
  const server = http.createServer((request, response) => {
    const stat = fs.statSync(path);

    response.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Length': stat.size,
    });

    const stream = fs.createReadStream(path);
    stream.pipe(response);
  });
  server.listen(8080);

  const sockets = [];
  server.on('connection', (socket) => {
    sockets.push(socket);
  });

  // Send create theme request
  const response = await createTheme({
    src: (await ngrok.connect(8080)).replace('https://', 'http://'),
    ...config,
  });

  // Close tunnel
  server.close();
  sockets.forEach((socket) => {
    socket.destroy();
  });

  await ngrok.kill();

  return response.theme.id;
};
