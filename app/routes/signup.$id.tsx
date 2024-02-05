import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, TypedResponse, json } from "@remix-run/node";
import { Participant, Signup, SignupOption as Option, User } from "@prisma/client";

import SignupOption from "~/components/SignupOption";
import { prisma } from "~/services/db";
import NavBar from "~/components/NavBar";

type SignupWithRefs = Signup & { 
  author: User,
  signupOptions: (
    Option & { participants: Participant[] }
  )[] 
};

export async function loader({ params }: LoaderFunctionArgs): Promise<TypedResponse<SignupWithRefs>> {
  const signup = await prisma.signup.findUnique({
    where: { id: String(params.id) },
    include: {
      author: true,
      signupOptions: { 
        include: { 
          participants: {
            orderBy: { createdAt: "asc" }
          },
        }, 
        orderBy: { index: "asc" }
      } 
    }
  });

  if (!signup) throw new Response("Not Found", { status: 404 });

  return json(signup);
}

export default function SignupDetails() {
  const signup = useLoaderData<typeof loader>();

  return (
    <>
      <NavBar />
      <div className="m-10 max-w-2xl mx-auto gap-10 flex flex-col">
        <div className="gap-4 flex flex-col">
          <h1 className="text-6xl font-bold">{signup.title}</h1>
          <p className="text-lg text-gray-600">{signup.description}</p>
          <p className="text-sm">Created by {signup.author.firstName} {signup.author.lastName}</p>
        </div>
        <h2 className="text-2xl font-bold">Signup Options</h2>
        <div className="gap-4 flex flex-col">
          {signup.signupOptions.map(option => <SignupOption key={option.id} option={option}/>)}
        </div>
        <Outlet />
      </div>
    </>
  )
}
