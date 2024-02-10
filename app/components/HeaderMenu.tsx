import {
  Group,
  Button,
  Box,
  Title,
} from '@mantine/core';
import { Link, useRouteLoaderData } from '@remix-run/react';

import { loader } from "~/root";

export function HeaderMenu() {
  const user = useRouteLoaderData<typeof loader>("root");

  return (
    <Box pb={120}>
      <header className='h-[60px] px-4 border-b'>
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
      </header>
    </Box>
  );
}
