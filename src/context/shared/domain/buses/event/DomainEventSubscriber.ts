import { DomainEvent } from 'krisemm/context/shared/domain/buses/event/DomainEvent';

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<DomainEvent>;

  process(domainEvent: T): void;
}
