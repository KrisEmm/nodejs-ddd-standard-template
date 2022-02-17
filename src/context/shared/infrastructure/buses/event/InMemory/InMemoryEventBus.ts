import { EventEmitter } from 'events';
import { DomainEvent } from 'krisemm/context/shared/domain/buses/event/DomainEvent';
import { DomainEventSubscriber } from 'krisemm/context/shared/domain/buses/event/DomainEventSubscriber';
import { EventBus } from 'krisemm/context/shared/domain/buses/event/EventBus';

export class InMemoryEventBus implements EventBus {
  private NodeEventEmitterBus: EventEmitter;

  constructor(eventSubscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.NodeEventEmitterBus = new EventEmitter();
    this.registerEventSubscribers(eventSubscribers);
  }

  publish(domainEvents: Array<DomainEvent>): void {
    domainEvents.map(domainEvent => {
      this.NodeEventEmitterBus.emit(domainEvent.eventName, domainEvent);
    });
  }

  registerEventSubscribers(eventSubscribers: Array<DomainEventSubscriber<DomainEvent>>): void {
    eventSubscribers.map(eventSubscriber => {
      eventSubscriber.subscribedTo().map(domainEvent => {
        this.NodeEventEmitterBus.on(domainEvent.eventName, eventSubscriber.process.bind(eventSubscriber));
      });
    });
  }
}
