import { Fieldset, Legend } from "@headlessui/react";
import EventsCheckbox from "./EventsCheckbox";

const InputEvents = ({ events, isStudentOfKmc }) => {
  return (
    <Fieldset className={"*:mb-2"}>
      <Legend className={"font-semibold text-base md:text-lg"}>
        Events you&apos;re participating in
      </Legend>
      {isStudentOfKmc ? (
        <>
          {events.map(({ eventName, eventSlug }, i) => {
            return (
              <EventsCheckbox
                key={i}
                eventName={eventName}
                eventSlug={eventSlug}
              />
            );
          })}
        </>
      ) : (
        <>
          {events
            .filter(({ eventSlug }) => eventSlug !== "medExhibition")
            .map(({ eventName, eventSlug }, i) => {
              return (
                <EventsCheckbox
                  key={i}
                  eventName={eventName}
                  eventSlug={eventSlug}
                />
              );
            })}
        </>
      )}
    </Fieldset>
  );
};

export default InputEvents;
