import { User } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs): Promise<User> {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}
