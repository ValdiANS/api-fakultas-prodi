import Hapi from '@hapi/hapi';
import routes from './routes.js';

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

const init = async () => {
  const server = Hapi.server({
    port,
    host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

init();
