import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import { returnToCookie } from '~/services/session.server';

export const loader = () => redirect('/login')

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get("returnTo") as string | null;

  try {
    return await authenticator.authenticate('google', request)
  } catch (error) {
    if (!returnTo) throw error;

    // By default remix will throw on non-2oo responses (even a redirect)
    // So catch the error, if it's a redirect, set a returnTo cookie
    if (error instanceof Response && isRedirect(error)) {
      const cookie = await returnToCookie.serialize(returnTo);
      error.headers.append("Set-Cookie", cookie);
      return error;
    }
    
    throw error;
  }
}

function isRedirect(response: Response) {
  if (response.status < 300 || response.status >= 400) return false;
  return response.headers.has("location");
}
