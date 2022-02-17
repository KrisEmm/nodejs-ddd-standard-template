import express from 'express';
import * as http from 'http';
import Logger from 'krisemm/context/shared/domain/logging/Logger';
import { Socket } from 'net';

export class Server {
  private readonly httpServerPort: number;
  private logger: Logger;
  private httpServer: http.Server;
  private httpConnections: Socket[];

  constructor(app: express.Express) {
    this.httpServerPort = app.get('port');
    this.logger = app.get('logger');
    this.httpServer = http.createServer(app);
    this.httpConnections = [];
  }

  public start(): void {
    this.startServerToListenOnPort(this.httpServerPort);
    this.registerServerEvents();
  }

  public stop(): void {
    let timerId: NodeJS.Timeout;
    if (this.httpConnections.length > 0) {
      timerId = setTimeout(() => {
        this.logger.info('Closing connections');
        this.httpConnections.map(connection => {
          connection.end(() => {
            this.logger.info('Connection closed');
          });
        });
      }, 200);
    }
    this.httpServer.close(() => {
      this.logger.info('Closing http server');
      clearTimeout(timerId);
      setTimeout(() => {
        this.logger.info('Http server closed');
        process.exit(0);
      }, 50);
    });
  }

  private startServerToListenOnPort(port: number): void {
    this.httpServer.listen(port);
  }

  private registerServerEvents(): void {
    this.onServerListen();
    this.onServerGetConnection();
  }

  private onServerListen(): void {
    this.httpServer.on('listening', () => {
      this.logger.info(`Server is Running on http://localhost:${this.httpServerPort}`);
      this.logger.debug(`ID Process: ${process.pid}`);
    });
  }

  private onServerGetConnection(): void {
    this.httpServer.on('connection', connection => {
      this.httpConnections.push(connection);
      connection.on('close', () => {
        this.httpConnections = this.httpConnections.filter(curr => curr !== connection);
      });
    });
  }
}
