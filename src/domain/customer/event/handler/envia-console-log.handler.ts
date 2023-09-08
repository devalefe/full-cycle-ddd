import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerEvent from "../customer-created.event";

export default class ConsoleLogHandler
  implements EventHandlerInterface<CustomerEvent>
{
  handle(event: CustomerEvent): void {
    const { id, name, Address: address } = event.eventData;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
  }
}
