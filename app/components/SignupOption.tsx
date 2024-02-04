import type { Participant, SignupOption } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { useState } from "react";

type Props = {
  option: SerializeFrom<SignupOption & {
    participants: Participant[];
  }>
}

export default function SignupOption({ option }: Props) {
  return (
    <div key={option.id} className="card border shadow">
      <details className="card-body py-4 px-4 pr-6 collapse collapse-plus">
        <summary className="collapse-title p-0 pl-6">
          <div className="flex flex-row items-center">
            <div className="flex-grow">
              <h2 className="card-title mb-1">{option.title}</h2>
              <p className="text-sm text-gray-600">{new Date(option.date).toLocaleDateString()}</p>
            </div>
            <p className="min-w-32 flex-grow-0 mr-4">{option.quantity - option.participants.length} of {option.quantity} available</p>
            <button className="btn btn-primary btn-outline">Sign Up</button>
          </div>
        </summary>
        <div className="collapse-content">
          <div className="divider"></div> 
          <p className="text-sm text-gray-600">{option.description}</p>

          <h3>Participants</h3>
          <ul>
            {option.participants.map(participant => (
              <li key={participant.id}>{participant.firstName} {participant.lastName}</li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}
