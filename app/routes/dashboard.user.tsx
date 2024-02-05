import { useRouteLoaderData } from "@remix-run/react";
import { loader as dashboardLoader } from "./dashboard_";

export default function DashboardUser() {
  const user = useRouteLoaderData<typeof dashboardLoader>('routes/dashboard')!;

  return (
    <div>
      <h1>Hello {user.firstName}</h1>
    </div>
  )
}
