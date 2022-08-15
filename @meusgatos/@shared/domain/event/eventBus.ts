/* eslint-disable @typescript-eslint/naming-convention */
import IDomainEvent from './domainEvent'

export interface IEventBus {
  notify(domainEvent: IDomainEvent): void
  notifyAll(domainEvents: IDomainEvent[]): void
}
