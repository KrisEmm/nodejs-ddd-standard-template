import { DomainEventConsumer } from 'krisemm/context/shared/domain/buses/event/DomainEventConsumer';
import { EntityManager } from 'typeorm';

export class MySqlDomainEventsConsumer implements DomainEventConsumer {
  private readonly entityManager: Promise<EntityManager>;

  constructor(entityManager: Promise<EntityManager>) {
    this.entityManager = entityManager;
  }

  consume(): void {
    //  Add logic to read from databases n domain events, rebuild and then allocate to subscribers
    console.log(this.entityManager);
  }
}
