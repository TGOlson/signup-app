import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "react-router";
import { authenticator } from "~/services/auth.server";

export const loader = () => redirect('/login');

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}
