import { createConnection, EntityManager } from 'typeorm';

export class TypeOrmEntityManagerFactory {
  static async create(): Promise<EntityManager> {
    const connection = await createConnection();
    return connection.manager;
  }
}
