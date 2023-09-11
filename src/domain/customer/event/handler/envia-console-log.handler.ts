import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class ConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, Address: address } = event.eventData;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
  }
}
