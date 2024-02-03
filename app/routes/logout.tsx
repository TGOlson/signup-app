import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "react-router";
import { authenticator } from "~/services/auth.server";

export const loader = () => redirect('/login');

export async function action({ request }: ActionFunctionArgs) {
  console.log("**** Logging out");
  await authenticator.logout(request, { redirectTo: "/login" });
}
