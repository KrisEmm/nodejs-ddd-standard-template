import { DomainEventBody } from 'krisemm/context/shared/domain/buses/event/DomainEventBody';

export abstract class DomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly eventOccurredOn: Date;

  constructor() {
    this.eventId = '';
    this.eventOccurredOn = new Date();
    this.eventName = this.getEventName();
  }

  abstract getEventName(): string;

  abstract getEventBody(): DomainEventBody;

  abstract reassembleToADomainEvent(
    eventId: string,
    eventName: string,
    occurredOn: Date,
    eventBody: DomainEventBody
  ): DomainEvent;
}
