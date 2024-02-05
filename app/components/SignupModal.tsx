import { SignupOption } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { RefObject, useEffect, useRef } from "react";
import { action } from "~/routes/signup.$id.option.$optionId.participant";

type Props = {
  modalRef: RefObject<HTMLDialogElement>,
  option: SerializeFrom<SignupOption>,
  availableSlots: number
}

const Label = ({ text }: {text: string}) => (
  <div className="label">
    <span className="label-text">{text}</span>
  </div>
);

export default function SignupModal({ modalRef, option, availableSlots }: Props) {
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
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box">
        <h3 className="font-bold text-2xl mb-2">Sign up!</h3>
        <div className="divider my-2"></div> 
        <h2 className="text-md"><span className="font-bold">Option:</span> {option.title}</h2>
        <h2 className="text-md"><span className="font-bold">Date:</span> {new Date(option.date).toLocaleDateString()}</h2>
        <div className="divider my-2"></div>
        <fetcher.Form method="post" action={`/signup/${option.signupId}/option/${option.id}/participant`} ref={formRef}>
          {/* <input type="hidden" name="signupOptionId" value={option.id} /> */}
          <div className="grid grid-cols-4 gap-x-4 gap-y-1">
            <div className="form-control col-span-2">
              <Label text="First Name" />
              <input required type="text" name="firstName" placeholder="Jane" className="input input-bordered" disabled={isSubmitting} />
            </div>
            <div className="form-control col-span-2">
              <Label text="Last Name" />
              <input required type="text" name="lastName" placeholder="Doe" className="input input-bordered" disabled={isSubmitting} />
            </div>
            <div className="form-control col-span-3">
              <Label text="Email" />
              <input required type="email" name="email" placeholder="janedoe@example.com" className="input input-bordered" disabled={isSubmitting} />
            </div>
            <div className="form-control col-span-1">
              <Label text="Quanity" />
              <select name="quantity" defaultValue={1} className="select select-bordered" disabled={isSubmitting}>
                {Array.from({length: availableSlots}, (_, i) => i + 1).map(i => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
            <div className="form-control col-span-4">
              <Label text="Comment (optional)" />
              <input type="text" name="comment" maxLength={100} placeholder="Super excited for this event!" className="input input-bordered" disabled={isSubmitting} />
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-4 ml-2 w-20 float-right">Submit</button>
        </fetcher.Form>
        <form method="dialog">
          <button className="btn float-right mt-4" disabled={isSubmitting}>Cancel</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button disabled={isSubmitting}>close</button>
      </form>
    </dialog>
  );
}
