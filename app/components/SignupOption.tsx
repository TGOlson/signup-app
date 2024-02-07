import type { Participant, SignupOption } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
// import { Link } from "@remix-run/react";
import SignupModal from "./SignupModal";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { ArrowRightIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/16/solid";
// import ArrowRightIcon from "./ArrowRightIcon";



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

  const [expanded, setExpanded] = useState(false);
  

  return (
    <div className="flex">
    <button className="btn btn-sm btn-outline btn-accent btn-circle border-0 mt-3">
      <ChevronRightIcon onClick={() => setExpanded(!expanded)} className="h-6 w-6 "/>
    </button>
    <div className="border-l-4 border-accent flex-grow shadow rounded-r">
      <div className="card card-compact">
        <div className="card-body py-1 grid grid-cols-4 items-center">
          <div className="col-span-2">
            <h2 className="card-title text-lg">{option.title}</h2>
            <p className="text-sm italic">{date}</p>
          </div>
          <div className="col-span-1 justify-self-end">
            <span className="badge col-span-1">{availableSlots} slots available</span>
          </div>
          <div className="col-span-1 justify-self-end">
            <button 
              className="btn btn-primary btn-outline" 
              onClick={() => modalRef.current?.showModal()} 
              disabled={availableSlots === 0}>
                Sign Up<ArrowRightIcon className="h-4 w-4"/>
            </button>
          </div>
        </div>
      </div>
      {expanded ? (
        <div className="grid grid-cols-4 gap-x-4">
          <div className="divider col-span-4 m-0 mx-8"/>
          <div className="col-span-2 card card-compact">
            <div className="card-body">
              <p className="text-xs font-bold mb-1">More info</p>
              <p className="text-sm">{option.description}</p>
            </div>
          </div>
          <div className="col-span-2 card card-compact">
            <div className="card-body">
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
      ): null}
    </div>
  </div>
      // <SignupModal option={option} availableSlots={availableSlots} modalRef={modalRef} />
  );
}
