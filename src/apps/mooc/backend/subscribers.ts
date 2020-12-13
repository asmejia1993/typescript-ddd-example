import container from './config/dependency-injection';
import { Definition } from 'node-dependency-injection';
import { DomainEventSubscriber } from '../../../Contexts/Shared/domain/DomainEventSubscriber';
import { DomainEvent } from '../../../Contexts/Shared/domain/DomainEvent';
import { EventBus } from '../../../Contexts/Shared/domain/EventBus';

export async function registerSubscribers() {
  const eventBus = container.get('Shared.EventBus') as EventBus;
  const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
  const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

  subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
  eventBus.addSubscribers(subscribers);
  await eventBus.start();
}
