import { DomainEvent } from 'krisemm/context/shared/domain/buses/event/DomainEvent';
import { EventBus } from 'krisemm/context/shared/domain/buses/event/EventBus';
import { EntityManager } from 'typeorm';

export class InMySqlEventBus implements EventBus {
  private readonly entityManager: Promise<EntityManager>;

  constructor(entityManager: Promise<EntityManager>) {
    this.entityManager = entityManager;
  }

  publish(domainEvents: Array<DomainEvent>): void {
    //  Add logic to save into database
    console.log(domainEvents, this.entityManager);
  }
}
