import { useRouteLoaderData } from "@remix-run/react";
import { loader as dashboardLoader } from "./dashboard";

export default function DashboardUser() {
  const user = useRouteLoaderData<typeof dashboardLoader>('routes/dashboard')!;

  return (
    <div>
      <h1>Hello {user.firstName}</h1>
    </div>
  )
}
