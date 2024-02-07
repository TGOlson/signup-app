import { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import { returnToCookie } from '~/services/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  // Use the returnTo cookie if one exists
  // Set in the auth.google action
  const returnTo = await returnToCookie.parse(request.headers.get("Cookie"));

  return authenticator.authenticate('google', request, {
    successRedirect: returnTo ?? '/dashboard',
    failureRedirect: '/login',
  })
}
