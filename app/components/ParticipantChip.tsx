import { Participant } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";

type Props = {
  participant: SerializeFrom<Participant>,
  isUser: boolean,
}

export default function ParticipantChip({participant, isUser}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <span className="text-sm truncate">{participant.firstName} {participant.lastName}{isUser ? ' (you)' : ''}</span>
        {participant.quantity > 1 ? <span className="badge badge-ghost">+{participant.quantity - 1}</span> : null}
      </div>
      {participant.comment 
        ? <span className="text-sm text-gray-400 italic truncate">{participant.comment}</span> 
        : null
      }
    </div>
  );
}
