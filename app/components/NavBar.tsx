import { Link, useRouteLoaderData } from "@remix-run/react"
import { loader } from "~/root";

export default function NavBar() {
  const user = useRouteLoaderData<typeof loader>("root");

  return (
    <div className="navbar bg-base-200 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Features</Link></li>
            <li><Link to="/">Get in touch</Link></li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" to="/">SignupApp</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Features</Link></li>
          <li><Link to="/">Get in touch</Link></li>
        </ul>
      </div>
      <div className="navbar-end mr-2">
        {user 
          ? (
            <Link className="btn btn-outline btn-primary" to="/dashboard">Dashboard</Link>
          ) 
          : (<>
              <ul className="menu menu-horizontal px-1">
                <li><Link to="/login">Sign in</Link></li>
              </ul>
              <Link className="btn btn-outline btn-primary" to="/signup">Create account</Link>
            </>)}
      </div>
    </div>
  );
}
