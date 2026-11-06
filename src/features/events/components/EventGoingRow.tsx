import type { EventAttendeePreview } from "../types/events.types.ts";

type EventGoingRowProps = {
  count: number;
  preview: EventAttendeePreview[];
  compact?: boolean;
};

function goingLabel(count: number) {
  if (count <= 0) return "Seja o primeiro";
  if (count === 1) return "1 vai";
  return `${count} vão`;
}

export function EventGoingRow({ count, preview, compact = false }: EventGoingRowProps) {
  const faces = preview.slice(0, 4);

  return (
    <div className={`flex min-w-0 items-center ${compact ? "gap-1.5" : "gap-2"}`}>
      {faces.length > 0 ? (
        <div className="flex -space-x-2">
          {faces.map((person) => (
            <img
              key={`${person.displayName}-${person.avatarUrl}`}
              src={person.avatarUrl}
              alt=""
              className="size-6 rounded-full object-cover ring-2 ring-[#0e0c0b]"
              loading="lazy"
            />
          ))}
        </div>
      ) : null}
      <span className="truncate text-[13px] text-massa-muted">{goingLabel(count)}</span>
    </div>
  );
}
