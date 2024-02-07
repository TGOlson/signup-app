import { useRef, useState } from "react";
import type { Participant, SignupOption, User } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import ParticipantChip from "./ParticipantChip";
import SignupModal from "./SignupModal";
import OptionHeader from "./OptionHeader";

type Props = {
  option: SerializeFrom<SignupOption & {
    participants: Participant[];
  }>
  user: SerializeFrom<User> | null | undefined;
}

export default function SignupOption({ option, user }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const availableSlots = option.quantity - option.participants.reduce((acc, participant) => acc + participant.quantity, 0);

  const [expanded, setExpanded] = useState(false);

  // TODO!
  // const alreadySignedUp = option.participants.some(participant => participant.userId === user?.id);

  return (
    <div className="flex">
    <div className="border-l-4 border-primary flex-grow shadow-md rounded-r bg-base-100">
      <div className="card card-compact">
        <div className="card-body flex flex-row justify-between	items-center !pl-0.5 gap-0">
          <button className="btn btn-sm btn-outline btn-primary btn-circle border-0 md:mx-1">
            {expanded 
              ? <ChevronDownIcon onClick={() => setExpanded(!expanded)} className="h-6 w-6 "/>
              : <ChevronRightIcon onClick={() => setExpanded(!expanded)} className="h-6 w-6 "/>
            }
          </button>
          <div className="flex flex-col items-start flex-grow md:flex-row md:items-center  md:justify-between">
            <div className="flex mb-1 md:mb-0">
              <div>
              <OptionHeader option={option} />
              </div>
            </div>
            <span className="bg-base-200 text-sm p-1 px-2 rounded-lg md:mr-6">{availableSlots} slots available</span>
          </div>
          <div className="">
            {user 
              ? <button 
                className={`btn btn-accent ${availableSlots > 0 ? '' : 'btn-disabled'} min-w-[88px]`}
                onClick={() => modalRef.current?.showModal()} 
              >
                Sign Up
                {/* {alreadySignedUp ? 'Edit' : 'Sign Up'} */}
              </button>
            : "Login to signup"}
          </div>
        </div>
      </div>
      {expanded ? (
        <div className="grid grid-cols-8">
          <div className="col-span-8 divider mx-4 my-0"/>
          <div className="col-span-5">
            <div className="card">
              <div className="card-body py-4">
                <p className="text-sm font-bold">Details</p>
                <p className="text-sm">{option.description}</p>
              </div>
              <div className="card-body py-4">
                <p className="text-sm font-bold">Location</p>
                <p className="text-sm text-gray-400 italic">n/a</p>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="card">
              <div className="card-body py-4">
                <p className="text-sm font-bold">Signups</p>
                {!option.participants.length ? <p className="text-sm text-gray-400 italic">No signups yet!</p> : null}
                {option.participants.map(participant => 
                  <ParticipantChip 
                    key={participant.id} 
                    participant={participant} 
                    isUser={user?.id === participant.userId}
                  />)
                }
              </div>
            </div>
          </div>
        </div>
      ): null}
    </div>
    {user ? <SignupModal option={option} availableSlots={availableSlots} modalRef={modalRef} user={user} /> : null}    
  </div>
  );
}
