// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunctionArgs, MetaFunction, TypedResponse } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
} from "@remix-run/react";

import styles from "./globals.css";
import { User } from "@prisma/client";
import { authenticator } from "./services/auth.server";

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
].concat(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []);

export async function loader({ request }: LoaderFunctionArgs): Promise<TypedResponse<User | null>> {
  return authenticator.isAuthenticated(request).then(json);
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}
