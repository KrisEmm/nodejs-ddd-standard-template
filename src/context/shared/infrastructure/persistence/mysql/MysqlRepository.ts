import { EntityManager } from 'typeorm';

export class MysqlRepository {
  private readonly entityManager: Promise<EntityManager>;

  constructor(entityManager: Promise<EntityManager>) {
    this.entityManager = entityManager;
  }

  EntityManager(): Promise<EntityManager> {
    return this.entityManager;
  }
}
