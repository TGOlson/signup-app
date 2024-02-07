import { useRef, useState } from "react";
import type { Participant, SignupOption } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import dayjs from "dayjs";
import { ArrowRightIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import ParticipantChip from "./ParticipantChip";
import SignupModal from "./SignupModal";

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
    <button className="btn btn-sm btn-outline btn-primary btn-circle border-0 mt-6 mr-1">
      {expanded 
        ? <ChevronDownIcon onClick={() => setExpanded(!expanded)} className="h-6 w-6 "/>
        : <ChevronRightIcon onClick={() => setExpanded(!expanded)} className="h-6 w-6 "/>
      }
    </button>
    <div className="border-l-4 border-primary flex-grow shadow rounded-r bg-base-100">
      <div className="card card-compact">
        <div className="card-body py-1 grid grid-cols-4 items-center">
          <div className="grid grid-cols-subgrid col-span-2 md:col-span-3">
            <div className="col-span-3 md:col-span-2">
              <h2 className="card-title text-lg">{option.title}</h2>
              <p className="text-sm italic">{date}</p>
            </div>
            <div className="col-span-1 justify-self-center">
              <span className="badge badge-ghost">{availableSlots} slots available</span>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 justify-self-end">
            <button 
              className={`btn btn-primary ${availableSlots > 0 ? 'btn-outline' : 'btn-disabled'} min-w-28`}
              onClick={() => modalRef.current?.showModal()} 
            >
              Sign Up<ArrowRightIcon className="h-4 w-4"/>
            </button>
          </div>
        </div>
      </div>
      {expanded ? (
        <div className="grid grid-cols-8 gap-x-4">
          <div className="col-span-8 divider mx-4 my-0"/>
          <div className="col-span-4">
            <div className="card card-compact">
              <div className="card-body">
                <p className="text-sm font-bold">Details</p>
                <p className="text-sm">{option.description}</p>
              </div>
              <div className="card-body">
                <p className="text-sm font-bold">Location</p>
                <p className="text-sm text-gray-400 italic">n/a</p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="card card-compact">
              <div className="card-body">
                <p className="text-sm font-bold">Signups</p>
                {!option.participants.length ? <p className="text-sm text-gray-400 italic">No signups yet!</p> : null}
                {option.participants.map(participant => <ParticipantChip key={participant.id} participant={participant} />)}
              </div>
            </div>
          </div>
        </div>
      ): null}
    </div>
    <SignupModal option={option} availableSlots={availableSlots} modalRef={modalRef} />
  </div>
  );
}
