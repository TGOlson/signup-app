import { ActionFunctionArgs } from "@remix-run/node";
import { requireUser } from "~/services/auth.server";
import { prisma } from "~/services/db.server";

// TODO: should also support updates?
export async function action({request, params}: ActionFunctionArgs) {
  const user = await requireUser(request);
  const signupOptionId = String(params.optionId);

  if (request.method === 'DELETE') {
    await prisma.participant.delete({
      where: {
        signupOptionId_userId: {
          signupOptionId,
          userId: user.id,
        },
      }
    });

    return ({ ok: true });
  }

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

  await prisma.participant.upsert({
    where: {
      signupOptionId_userId: {
        signupOptionId,
        userId: user.id,
      },
    },
    update: {
      firstName,
      lastName,
      quantity,
      comment,
    },
    create: data,
  });

  return ({ ok: true });
}
