import { Fieldset, Legend } from "@headlessui/react";
import EventsCheckbox from "./EventsCheckbox";

const InputEvents = ({ events }) => {
  return (
    <Fieldset className={"*:mb-2"}>
      <Legend className={"font-semibold text-base md:text-lg"}>
        Events you&apos;re participating in
      </Legend>
      {events.map(({ eventName, eventSlug }, i) => {
        return (
          <EventsCheckbox key={i} eventName={eventName} eventSlug={eventSlug} />
        );
      })}
    </Fieldset>
  );
};

export default InputEvents;
