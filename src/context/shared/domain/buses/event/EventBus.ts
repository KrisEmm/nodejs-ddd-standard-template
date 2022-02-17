import { DomainEvent } from 'krisemm/context/shared/domain/buses/event/DomainEvent';

export interface EventBus {
  publish(domainEvents: Array<DomainEvent>): void;
}
