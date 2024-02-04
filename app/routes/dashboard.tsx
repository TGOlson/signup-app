import { Form, Link, Outlet } from "@remix-run/react";
import { loader } from "./auth.me";

export { loader };

export default function Dashboard() {
  return (
    <div>
      <div className="drawer drawer-open border-e bg-white">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <section><Outlet /></section>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li><Link to="/dashboard/user">Profile</Link></li>
            <li><Link to="/dashboard/signups">Signups</Link></li>
            <li><Link to="/dashboard/settings">Settings</Link></li>
            <Form action="/logout" method="post">
              <button className="btn btn-ghost" type="submit">Sign out</button>
            </Form>
          </ul>
        </div>
      </div>
    </div>
  )
}
