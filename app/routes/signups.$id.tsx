import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, TypedResponse, json } from "@remix-run/node";
import { Participant, Signup, SignupOption, User } from "@prisma/client";

import { prisma } from "~/services/db";

type SignupWithRefs = Signup & { 
  author: User,
  signupOptions: (
    SignupOption & { participants: Participant[] }
  )[] 
};

export async function loader({ params }: LoaderFunctionArgs): Promise<TypedResponse<SignupWithRefs>> {
  const signup = await prisma.signup.findUnique({
    where: { id: String(params.id) },
    include: {
      author: true,
      signupOptions: { 
        include: { participants: true } 
      } 
    }
  });

  if (!signup) throw new Response("", { status: 404 });

  return json(signup);
}

export default function DashboardUser() {
  const signup = useLoaderData<typeof loader>();

  return (
    <div className="m-10 max-w-2xl mx-auto gap-10 flex flex-col">
      <div className="gap-4 flex flex-col">
        <h1 className="text-6xl font-bold">{signup.title}</h1>
        <p className="text-lg text-gray-600">{signup.description}</p>
        <p className="text-sm">Created by {signup.author.firstName} {signup.author.lastName}</p>
      </div>
      <h2 className="text-2xl font-bold">Signup Options</h2>
      <div className="gap-4 flex flex-col">
        {signup.signupOptions.map(option => (
          <div key={option.id} className="card border shadow">
            <div className="card-body flex flex-row">
              <h2 className="card-title flex-grow">{option.title}</h2>
              <p>{new Date(option.date).toLocaleDateString()}</p>
              <p>{option.quantity - option.participants.length} of {option.quantity} available</p>
              <button className="btn btn-primary btn-outline">Sign Up</button>
            </div>
          </div>
          // <li key={option.id}>
          //   <h3 className="text-xl font-bold">{option.title}</h3>
          //   <p>{option.description}</p>
          //   <p>Participants: {option.participants.length}</p>
          // </li>
        ))}
      </div>
    </div>
  )
}
