import { Participant, SignupOption, User } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { RefObject, useEffect, useRef } from "react";
import { action } from "~/routes/signup.$id.option.$optionId.participant";
import OptionHeader from "./OptionHeader";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  modalRef: RefObject<HTMLDialogElement>,
  option: SerializeFrom<SignupOption>,
  participant?: SerializeFrom<Participant>,
  user: SerializeFrom<User>,
  availableSlots: number,
}

const Label = ({ text }: {text: string}) => (
  <div className="label">
    <span className="label-text">{text}</span>
  </div>
);

export default function SignupModal({ modalRef, option, participant, availableSlots, user }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const fetcher = useFetcher<typeof action>();
  const isSubmitting = fetcher.state !== 'idle';

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.ok) {
      modalRef.current?.close();
      formRef.current?.reset();
    }
  }, [fetcher.state, fetcher.data, modalRef]);

  return (
    <dialog className='modal' ref={modalRef}>
      <div className="modal-box rounded-md max-w-md">
        <h1 className="font-bold text-3xl mb-2">{participant ? 'Edit Your Sign Up' : 'Sign Up!'}</h1>
        <OptionHeader option={option} />
        <div className="divider my-2"></div>
        <fetcher.Form method="post" action={`/signup/${option.signupId}/option/${option.id}/participant`} ref={formRef}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-1">
            <div className="form-control col-span-2">
              <Label text="First Name" />
              <input 
                required 
                type="text" 
                name="firstName" 
                maxLength={50} 
                defaultValue={participant ? participant.firstName : user.firstName} 
                className="input input-bordered" 
                disabled={isSubmitting} 
                />
            </div>
            <div className="form-control col-span-2">
              <Label text="Last Name" />
              <input 
                required 
                type="text" 
                name="lastName" 
                maxLength={50} 
                defaultValue={participant ? participant.lastName : user.lastName} 
                className="input input-bordered" 
                disabled={isSubmitting} 
              />
            </div>
            <div className="form-control col-span-1">
              <Label text="Quanity" />
              <select name="quantity" defaultValue={participant ? participant.quantity : 1} className="select select-bordered" disabled={isSubmitting}>
                {Array.from({length: (availableSlots + (participant ? participant.quantity : 0))}, (_, i) => i + 1).map(i => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
            <div className="form-control col-span-3">
              <Label text="Comment (optional)" />
              <input 
                type="text" 
                name="comment" 
                maxLength={50} 
                placeholder="Super excited!" 
                defaultValue={participant?.comment || undefined}
                className="input input-bordered" 
                disabled={isSubmitting} 
              />
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-6 ml-2 float-right">Submit</button>
        </fetcher.Form>
        {participant ? (
            <fetcher.Form method="delete" action={`/signup/${option.signupId}/option/${option.id}/participant`} >
            <button type="submit" disabled={isSubmitting} className="btn btn-error mt-6 float-left">
              Delete<TrashIcon className="h-5 w-5"/>
            </button>
          </fetcher.Form>
        ) : null}
        <form method="dialog">
          <button className="btn float-right mt-6" disabled={isSubmitting}>Cancel</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button disabled={isSubmitting}>close</button>
      </form>
    </dialog>
  );
}
