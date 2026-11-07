import { Button } from "@heroui/react";
import { Check, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useEventRsvp } from "../hooks/use-event.ts";
import type { EventRsvpStatus } from "../types/events.types.ts";

type EventRsvpButtonProps = {
  eventId: string;
  status: EventRsvpStatus;
  size?: "sm" | "md";
  fullWidth?: boolean;
};

export function EventRsvpButton({
  eventId,
  status: initialStatus,
  size = "md",
  fullWidth = false,
}: EventRsvpButtonProps) {
  const [status, setStatus] = useState(initialStatus);
  const rsvp = useEventRsvp(eventId);
  const going = status === "going";

  return (
    <Button
      size={size}
      fullWidth={fullWidth}
      isPending={rsvp.isPending}
      className={
        going
          ? "border border-fm-purple/40 bg-fm-purple/15 font-bold text-fm-purple"
          : "btn-fm-purple bg-fm-purple font-bold text-white"
      }
      variant={going ? "secondary" : "primary"}
      onPress={() => {
        const next: EventRsvpStatus = going ? "none" : "going";
        setStatus(next);
        rsvp.mutate(next, {
          onError: () => setStatus(going ? "going" : "none"),
        });
      }}
    >
      {going ? (
        <>
          <Check className="size-4" />
          Eu vou
        </>
      ) : (
        <>
          <ThumbsUp className="size-4" />
          Eu vou
        </>
      )}
    </Button>
  );
}
