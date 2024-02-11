import {
  Group,
  Button,
  Title,
  AppShell,
} from '@mantine/core';
import { Link, Outlet, useRouteLoaderData } from '@remix-run/react';

import { loader } from "~/root";

export default function Header() {
  const user = useRouteLoaderData<typeof loader>("root");

  return (
    <AppShell
      header={{height: 60}}
    >
      <AppShell.Header classNames={{header: 'px-4'}}>
        <Group justify="space-between" h="100%">          
          <Title order={1}>SignupApp</Title>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Button classNames={{label: 'font-normal'}} component={Link} to="#" variant="subtle" color='black'>Features</Button>
            <Button classNames={{label: 'font-normal'}} component={Link} to="#" variant="subtle" color='black'>Pricing</Button>
            <Button classNames={{label: 'font-normal'}} component={Link} to="#" variant="subtle" color='black'>Learn More</Button>
          </Group>

          <Group visibleFrom="sm">
            {user 
              ? <Button component={Link} to="/dashboard">Dashboard</Button>
              : <>
                  <Button component={Link} to="/login" variant="default">Log in</Button>
                  <Button component={Link} to="/login">Sign up</Button>
                </>
            }
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
