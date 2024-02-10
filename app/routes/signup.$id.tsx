import { Outlet, UIMatch, useLoaderData, useMatches, useRouteLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, TypedResponse, json } from "@remix-run/node";
import { Participant, Signup, SignupOption as Option, User } from "@prisma/client";

import SignupOption from "~/components/SignupOption";
import { prisma } from "~/services/db.server";
import NavBar from "~/components/NavBar";

import { loader as rootLoader } from "../root";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { handle } from "./signup.$id.edit";
import { Title, Text } from "@mantine/core";
import { HeaderMenu } from "~/components/HeaderMenu";

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
  const matches = useMatches() as UIMatch<unknown, typeof handle>[];

  const editable = matches.some(match => match.handle?.editable);

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderMenu />
      <div className="bg-diagonal flex-grow">
        <div className="max-w-3xl mx-auto flex flex-col mb-10">
          <Outlet />
          <div className="card card-compact my-5">
            <div className="card-body">
              {editable
                ? <input required type="text" defaultValue={signup.title} className="input input-bordered input-lg h-20 text-6xl font-bold" />
                : <Title className="!text-6xl" order={1}>{signup.title}</Title>
              }
              {editable
                ? <textarea required defaultValue={signup.description} rows={3} className="textarea textarea-bordered textarea-lg text-lg text-gray-600" />
                : <Text fz="lg">{signup.description}</Text>
              }
              <p className="text-sm flex items-center gap-1">
                Created by {signup.author.firstName} {signup.author.lastName}
                <a href={`mailto:${signup.author.email}?subject=${signup.title}`} className="link"><EnvelopeIcon className="h-4 w-4" /></a>
              </p>
            </div>
          </div>
          <div className="gap-6 flex flex-col p-0">
            {signup.signupOptions.map(option => <SignupOption key={option.id} option={option} user={user} editable={editable}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}
