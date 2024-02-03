// Loaders only run on the server and provide data

import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, Outlet, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import NavBar from "~/components/NavBar";

// to your component on GET requests
type User = {
  id: number,
  name: string,
}

const users = [
  {
    id: 123,
    name: 'Tyler',
  }, {
    id: 345,
    name: 'Tina',
  }
];

export async function loader(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users)
    }, 500);
  });
}

// The default export is the component that will be
// rendered when a route matches the URL. This runs
// both on the server and the client
export default function Test() {
  console.log('rendering test component');
  const users = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const nav = useNavigation();
  const isSubmitting = nav.formAction === "/test"; // /test === this page

  console.log('nav', nav);

  return (
    <div>
      <NavBar />
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/user/${user.id}`}>
            {user.name}
          </Link>
        </div>
      ))}

      <Form method="post">
        <input name="name" />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create New User"}
        </button>
      </Form>
      {actionData?.errors?.name ? (
        <em>{actionData.errors.name}</em>
      ) : null}
      <Outlet />
    </div>
  );
}

// Actions only run on the server and handle POST
// PUT, PATCH, and DELETE. They can also provide data
// to the component
export async function action({request}: ActionFunctionArgs) {
  console.log('in action!')
  const formData = await request.formData();
  console.log('formdata!', formData);
  
  const name = String(formData.get('name'));
  console.log('name', name);

  if (!name) {
    return {
      errors: {
        name: 'Name is required',
      }
    }
  }

  const user = {
    id: 999,
    name,
  };

  console.log('creating user');

  users.push(user);

  return { ok: true };
}
