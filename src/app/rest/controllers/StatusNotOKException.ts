import { DomainException } from 'krisemm/context/shared/domain/exceptions/DomainException';

export class StatusNotOKException extends DomainException {
  constructor(msg: string) {
    super();
    this.name = 'Status Not Ok Exception';
    this.message = msg;
  }
}
