import { ApplicationWebApp } from 'krisemm/app/web/config/ApplicationWebApp';
import { Server } from 'krisemm/context/shared/infrastructure/express/server/Server';

export class ApplicationsManager {
  private static application1WebApp: Server;

  static start(): void {
    this.application1WebApp = new Server(ApplicationWebApp);
    this.application1WebApp.start();
  }

  static stop(): void {
    this.application1WebApp.stop();
  }
}
