import { LoaderFunctionArgs, TypedResponse, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { prisma } from "~/services/db";
import { requireUser } from "~/services/auth.server";
import { Signup } from "@prisma/client";

export async function loader({ request }: LoaderFunctionArgs): Promise<TypedResponse<Signup[]>> {
  const user = await requireUser(request);

  const signups = await prisma.signup.findMany({where: {
    authorId: user.id 
  }})

  return json(signups);
}

export default function DashboardSignups() {
  const signups = useLoaderData<typeof loader>();

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold mb-10">Signups created</h1>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body overflow-x-auto ">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Published</th>
              <th>Created</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {signups.map((signup, index) => {
              return (
                <tr key={signup.id}>
                  <th>{index + 1}</th>
                  <td>{signup.title}</td>
                  <td>
                    <input type="checkbox" checked={signup.published} disabled className="checkbox checkbox-sm" />
                  </td>
                  <td>{new Date(signup.createdAt).toLocaleString()}</td>
                  <td>
                    <Link className="btn btn-ghost btn-xs" to={`/signup/${signup.id}`}>View</Link>
                  </td>
                  <td>
                    <Link className="btn btn-ghost btn-xs" to={`/signup/${signup.id}/edit`}>Edit</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
