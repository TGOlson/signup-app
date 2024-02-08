import { useRef, useState } from "react";
import type { Participant, SignupOption, User } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { ChevronDownIcon, ChevronRightIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import SignupModal from "./SignupModal";
import OptionHeader from "./OptionHeader";
import { Link } from "@remix-run/react";
import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

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

  const participant = option.participants.find(participant => participant.userId === user?.id);
  console.log('existing participant', participant);
  const alreadySignedUp = !!participant;

  const openModal = () => modalRef.current?.showModal();

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
            <span className="bg-accent text-accent-content text-sm p-1 px-2 rounded-lg md:mr-6">{availableSlots} slots available</span>
          </div>
          <div className="">
            {user && !alreadySignedUp
              ? <button 
                  className={`btn btn-primary ${availableSlots > 0 ? 'btn-outline' : 'btn-disabled'} min-w-[112px]`} 
                  onClick={openModal}>
                    Sign Up<ArrowRightIcon className="h-4 w-4" />
                </button>
              : null
            }
            {user && alreadySignedUp 
              ? <div className="min-w-[112px] flex items-center justify-center gap-1">
                  <span className="font-bold text-md">Signed Up</span>
                    <CheckCircleIcon className="h-8 w-8 text-accent" /> 
                </div>
              : null
            }
            {!user ? <Link className="btn btn-link" to={`/login?returnTo=/signup/${option.signupId}`}>Login to Sign Up</Link> : null}
          </div>
        </div>
      </div>
      {expanded ? (
        <div className="grid grid-cols-8">
          <div className="col-span-8 divider mx-4 my-0"/>
          <div className="col-span-4 md:col-span-5">
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
          <div className="col-span-4 md:col-span-3">
            <div className="card">
              <div className="card-body gap-0 py-4">
                <p className="text-sm font-bold mb-2">Signups</p>
                {!option.participants.length ? <p className="text-sm text-gray-400 italic">No signups yet!</p> : null}
                {option.participants.map(({id, firstName, lastName, quantity, comment, userId}) => 
                  <div key={id} className="flex flex-col">
                    <div className="flex gap-1 items-center">
                      <span className="text-sm truncate">{firstName} {lastName}</span>
                      {quantity > 1 ? <span className="badge badge-ghost">+{quantity - 1}</span> : null}
                      {participant?.userId === userId ? <button className="btn btn-link btn-xs px-0" onClick={openModal}><PencilSquareIcon className="h-4 w-4" /></button> : null}
                    </div>
                    {comment ? <span className="text-sm text-gray-400 italic truncate">{comment}</span> : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ): null}
    </div>
    {user ? <SignupModal option={option} availableSlots={availableSlots} participant={participant} modalRef={modalRef} user={user} /> : null}    
  </div>
  );
}
