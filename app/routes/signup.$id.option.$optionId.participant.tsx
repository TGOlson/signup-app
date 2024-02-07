import { ActionFunctionArgs } from "@remix-run/node";
import { requireUser } from "~/services/auth.server";
import { prisma } from "~/services/db";

// TODO: should also support updates?
export async function action({request, params}: ActionFunctionArgs) {
  const user = await requireUser(request);

  const signupOptionId = String(params.optionId);

  const formData = await request.formData();

  const firstName = String(formData.get('firstName'));
  const lastName = String(formData.get('lastName'));
  const quantity = Number(formData.get('quantity'));
  const comment = formData.get('comment') as string | undefined;

  const data = {
    signupOptionId,
    firstName,
    lastName,
    userId: user.id,
    quantity,
    comment,
  };

  await prisma.participant.create({ data });

  return ({ ok: true });
}
