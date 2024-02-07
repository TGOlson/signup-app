import { Outlet, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, TypedResponse, json } from "@remix-run/node";
import { Participant, Signup, SignupOption as Option, User } from "@prisma/client";

import SignupOption from "~/components/SignupOption";
import { prisma } from "~/services/db.server";
import NavBar from "~/components/NavBar";

import { loader as rootLoader } from "../root";

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
  const user = useRouteLoaderData<typeof rootLoader>("root");
  const signup = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-kiwi flex-grow">
        <div className="max-w-3xl mx-auto flex flex-col">
          <div className="card card-compact my-5">
            <div className="card-body">
              <h1 className="text-6xl font-bold">{signup.title}</h1>
              <p className="text-lg text-gray-600">{signup.description}</p>
              <p className="text-sm">Created by {signup.author.firstName} {signup.author.lastName}</p>
            </div>
          </div>
          <div className="gap-6 flex flex-col p-0">
            {signup.signupOptions.map(option => <SignupOption key={option.id} option={option} user={user}/>)}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
