"use client";

import { Fieldset, Legend } from "@headlessui/react";
import EventsCheckbox from "./EventsCheckbox";

const defaultLegend = "Events you're participating in";

const InputEvents = ({
  events = [],
  isStudentOfKmc = false,
  isPgStudent = false,
  disableFilters = false,
  selectedEvents,
  onSelectedEventsChange,
  legendText = defaultLegend,
  helperText,
  checkboxName = "events",
}) => {
  let filteredEvents = events.filter(
    ({ eventName }) => !eventName.toLowerCase().includes("workshop")
  );

  if (!disableFilters) {
    if (!isStudentOfKmc) {
      filteredEvents = filteredEvents.filter(
        ({ kmcExclusive }) => !kmcExclusive
      );
    }
    if (isPgStudent) {
      filteredEvents = filteredEvents.filter(
        ({ pgsAllowed = true }) => pgsAllowed
      );
    }
  }

  const isControlled =
    Array.isArray(selectedEvents) &&
    typeof onSelectedEventsChange === "function";
  const selectionSet = new Set(selectedEvents || []);

  const handleToggle = (slug, nextChecked) => {
    if (!isControlled) return;
    const next = new Set(selectionSet);
    if (nextChecked) {
      next.add(slug);
    } else {
      next.delete(slug);
    }
    onSelectedEventsChange(Array.from(next));
  };

  const helperCopy =
    helperText ||
    (isStudentOfKmc
      ? "KMC students can opt into any challenge below."
      : isPgStudent
        ? "PG delegates can participate in any event marked as PG-friendly below."
        : "Pick all the competitions you'd love to compete in.");

  return (
    <Fieldset className="space-y-4">
      {legendText && (
        <Legend className="text-base font-semibold text-slate-700">
          {legendText}
        </Legend>
      )}
      {helperCopy && <p className="text-sm text-slate-500">{helperCopy}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        {filteredEvents.map(({ eventName, eventSlug }) => (
          <EventsCheckbox
            key={eventSlug}
            eventName={eventName}
            eventSlug={eventSlug}
            name={isControlled ? undefined : checkboxName}
            checked={isControlled ? selectionSet.has(eventSlug) : undefined}
            onToggle={
              isControlled ? (next) => handleToggle(eventSlug, next) : undefined
            }
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
