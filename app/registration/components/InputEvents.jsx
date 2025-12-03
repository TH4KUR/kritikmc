import { Fieldset, Legend } from "@headlessui/react";
import EventsCheckbox from "./EventsCheckbox";

const InputEvents = ({ events, isStudentOfKmc, isPgStudent }) => {
  let filteredEvents = events.filter(
    ({ eventName }) => !eventName.toLowerCase().includes("workshop")
  );
  if (!isStudentOfKmc) {
    filteredEvents = filteredEvents.filter(({ kmcExclusive }) => !kmcExclusive);
  } else if (isPgStudent) {
    filteredEvents = filteredEvents.filter(
      ({ pgsAllowed = true }) => pgsAllowed
    );
  }

  return (
    <Fieldset className="space-y-4">
      <Legend className="text-base font-semibold text-slate-700">
        Events you&apos;re participating in
      </Legend>
      <p className="text-sm text-slate-500">
        {isStudentOfKmc
          ? "KMC students can opt into any challenge below."
          : isPgStudent
            ? "PG delegates can participate in any event marked as PG-friendly below."
            : "Pick all the competitions you'd love to compete in."}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {filteredEvents.map(({ eventName, eventSlug }) => (
          <EventsCheckbox
            key={eventSlug}
            eventName={eventName}
            eventSlug={eventSlug}
          />
        ))}
      </div>
      {!filteredEvents.length && (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4 text-sm text-slate-500">
          No events are currently available for your selected profile.
        </p>
      )}
    </Fieldset>
  );
};

export default InputEvents;
