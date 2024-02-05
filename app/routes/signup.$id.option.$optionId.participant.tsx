import { ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "~/services/db";

// TODO: should also support updates?
export async function action({request, params }: ActionFunctionArgs) {
  const signupOptionId = String(params.optionId);

  const formData = await request.formData();

  const firstName = String(formData.get('firstName'));
  const lastName = String(formData.get('lastName'));
  const email = String(formData.get('email'));
  const quantity = Number(formData.get('quantity'));
  const comment = formData.get('comment') as string | undefined;

  const data = {
    signupOptionId,
    firstName,
    lastName,
    email,
    quantity,
    comment,
  };

  await prisma.participant.create({ data });

  return ({ ok: true });
}
