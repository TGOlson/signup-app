import { Form, useParams, useSearchParams } from "@remix-run/react";
import GoogleIcon from "../components/GoogleIcon";
import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export default function Login() {
  const [params] = useSearchParams();
  const returnTo = params.get('returnTo');

  return (
    <div className="w-full py-20">
      <div className="card shrink-0 w-full max-w-sm bg-base-100 mx-auto gap-y-8">
        <div className="text-center gap-y-4">
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
        </div>
        <div className="card-body border rounded">
          <Form action='/auth/email' className="space-y-4">
            <div className="form-control">
              <input type="email" name="email" placeholder="Email address" className="input input-bordered text-sm h-10" required />
            </div>
            <div className="form-control">
              <button className="btn btn-primary">Sign in</button>
            </div>
          </Form>
          <div className="divider">
          <p className="text-gray-500 text-xs">Or continue with</p> 
          </div>
          <Form action={`/auth/google${returnTo ? `/?returnTo=${returnTo}` : ''}`} method="post">
            <button className="btn" style={{width: '100%'}}>
              <GoogleIcon /> Sign in with Google 
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}
