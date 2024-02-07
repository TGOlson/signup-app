import { Participant, SignupOption } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, TypedResponse, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import RegisterForm from "~/components/RegisterForm";
import { prisma } from "~/services/db";

type SignupOptionWithRefs = SignupOption & { participants: Participant[] }

export async function loader({ params }: LoaderFunctionArgs): Promise<TypedResponse<SignupOptionWithRefs>> {
  const signup = await prisma.signupOption.findUnique({
    where: { id: String(params.optionId) },
    include: {
      participants: {
        orderBy: { createdAt: "asc" }
      },
    }
  });
  
  if (!signup) throw new Response("Not Found", { status: 404 });
  
  return json(signup);
}

// TODO: not in use, probably remove this component?
export default function Register() {
  const signupOption = useLoaderData<typeof loader>();

  return (
    <RegisterForm option={signupOption} availableSlots={12} />
  );
}

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
