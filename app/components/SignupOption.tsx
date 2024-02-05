import type { Participant, SignupOption } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import SignupModal from "./SignupModal";
import { useRef } from "react";
import dayjs from "dayjs";

type Props = {
  option: SerializeFrom<SignupOption & {
    participants: Participant[];
  }>
}

export default function SignupOption({ option }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const availableSlots = option.quantity - option.participants.reduce((acc, participant) => acc + participant.quantity, 0);

  const d = dayjs(option.date);
  const date = d.format("dddd MMM D, YYYY");
  // const time = d.format("h:mm A");

  return (
    <div key={option.id} className="card border shadow">
      <details className="card-body py-4 px-4 pr-6 collapse collapse-plus">
        <summary className="collapse-title p-0 pl-6 flex flex-col justify-center">
          <div className="flex flex-row items-center">
            <div className="flex-grow">
              <h2 className="card-title text-xl">{option.title}</h2>
              <p className="text-sm italic">{date}</p>
              {/* <p className="text-sm italic text-gray-500">{time}</p> */}
            </div>
            <span className="badge badge-warning min-w-32 flex-grow-0 mr-4">{availableSlots} slots available</span>
            <button className="btn btn-primary btn-outline" onClick={() => modalRef.current?.showModal()} disabled={availableSlots === 0}>Sign Up</button>
          </div>
        </summary>
        <div className="collapse-content p-0 pb-0 pl-6">
          <div className="divider my-2 mb-3"></div> 
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <p className="text-xs font-bold mb-1">Details</p>
              <p className="text-sm">{option.description}</p>
            </div>
            <div className="flex flex-col col-span-1">
              <p className="text-xs font-bold mb-1">Signups</p>
              {!option.participants.length ? <p className="text-sm text-gray-400 italic">No signups yet!</p> : null}
              {option.participants.map(participant => (
                <div key={participant.id} className="text-sm gap-2 flex text-nowrap">
                  <span>{participant.firstName} {participant.lastName}</span>
                  {participant.quantity > 1 ? <span className="badge badge-sm badge-primary">{participant.quantity}</span> : null}
                  {participant.comment ? <span className="text-sm text-gray-400 italic truncate">{participant.comment}</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </details>
      <SignupModal option={option} availableSlots={availableSlots} modalRef={modalRef} />
    </div>
  );
}
