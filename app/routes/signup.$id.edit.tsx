import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { prisma } from "~/services/db.server";
import { authenticator } from "~/services/auth.server";

export const handle = {
  editable: true
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const signup = await prisma.signup.findUnique({
    where: { id: String(params.id) },
  });

  if (!signup) throw new Response("Not found", { status: 404 });

  const user = await authenticator.isAuthenticated(request);

  if (!user || signup.authorId !== user.id) {
    return redirect(`/signup/${signup.id}`);
  }

  return null;
}

export default function SignupEdit() {
  return <h1>TODO: add settings panel here</h1>
}
