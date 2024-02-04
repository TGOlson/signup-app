import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, TypedResponse, json } from "@remix-run/node";
import { Signup } from "@prisma/client";

import { prisma } from "~/services/db";

export async function loader({ params }: LoaderFunctionArgs): Promise<TypedResponse<Signup>> {
  const signup = await prisma.signup.findUnique({
    where: { id: String(params.id) },
  });

  if (!signup) throw new Response("", { status: 404 });

  return json(signup);
}

export default function DashboardUser() {
  const signup = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-3xl font-bold">View signup</h1>
      <h1 className="text-3xl font-bold">{signup.title}</h1>
      <p className="mt-4 text-gray-500">{signup.description}</p>
    </div>
  )
}
