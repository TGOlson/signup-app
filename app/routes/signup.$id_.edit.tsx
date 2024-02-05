import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, TypedResponse, json, redirect } from "@remix-run/node";
import { Signup } from "@prisma/client";

import { prisma } from "~/services/db";
import { authenticator } from "~/services/auth.server";

export async function loader({ params, request }: LoaderFunctionArgs): Promise<TypedResponse<Signup>> {
  const signup = await prisma.signup.findUnique({
    where: { id: String(params.id) },
  });

  if (!signup) throw new Response("", { status: 404 });

  const user = await authenticator.isAuthenticated(request);

  if (!user || signup.authorId !== user.id) {
    return redirect(`/signup/${signup.id}`);
  }

  return json(signup);
}

export default function DashboardUser() {
  const signup = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-screen bg-base-200">
      <div className="form-control max-w-lg">
        <div className="label"><span className="label-text">Title</span></div>
        <h1 contentEditable className="border-b-4 border-indigo-500 w-full text-3xl">{signup.title}</h1>
        <div className="label"><span className="label-text">Description</span></div>
        <textarea defaultValue={signup.description} className="textarea h-24 w-full text-xl" />
      </div>
      {/* <p contentEditable className="mt-4 text-gray-500">{signup.description}</p> */}
    </div>
  )
}
