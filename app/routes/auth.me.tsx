import { User } from "@prisma/client";
import { LoaderFunctionArgs, TypedResponse, json } from "@remix-run/node";
import { requireUser } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs): Promise<TypedResponse<User>> {
  return requireUser(request).then(json);
}
