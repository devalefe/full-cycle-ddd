import EventDispatcher from "../../@shared/event/event-dispatcher";

import ConsoleLogHandler from "./handler/envia-console-log.handler";
import ConsoleLog1Handler from "./handler/envia-console-log1.handler";
import ConsoleLog2Handler from "./handler/envia-console-log2.handler";

import CustomerCreatedEvent from "./customer-created.event";
import CustomerAddressChangedEvent from "./customer-address-changed.event";

import Customer from "../entity/customer";
import Address from "../value-object/address";

describe('Customer Event', () => {
  it("Should notify event handlers on customer is created", () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new ConsoleLog1Handler()
    const eventHandler2 = new ConsoleLog2Handler()
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle")
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle")

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    const customer = new Customer("1", "Customer 1")

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it('Should notify event handlers on customer address is changed', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new ConsoleLog1Handler()
    const eventHandler2 = new ConsoleLog2Handler()
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle")
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle")

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    const customer = new Customer("1", "Customer 1")

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

    const eventHandler = new ConsoleLogHandler()
    const spyEventHandler = jest.spyOn(eventHandler, "handle")

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

    const address = new Address("Street Name", 1, "12345000", "City Name")
    customer.changeAddress(address);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);

    eventDispatcher.notify(customerAddressChangedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
