if (process.env.NODE_ENV === 'prod') {
  require('module-alias/register');
} else {
  require('tsconfig-paths/register');
}
import { ApplicationWebApp } from 'krisemm/app/web/config/ApplicationWebApp';
import { Server } from 'krisemm/context/shared/infrastructure/express/server/Server';

const applicationRestAppServer: Server = new Server(ApplicationWebApp);

applicationRestAppServer.start();

process.on('uncaughtException', err => {
  console.info('uncaughtException', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received');
  applicationRestAppServer.stop();
});
