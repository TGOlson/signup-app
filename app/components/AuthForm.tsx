import {
  TextInput,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Title,
} from '@mantine/core';

import { GoogleButton } from './GoogleButton';
import { Form, Link, useSearchParams } from '@remix-run/react';

type Props = {
  type: 'login' | 'signup';
}

export function AuthForm({ type }: Props) {
  const [params] = useSearchParams();
  const returnTo = params.get('returnTo');
  const googleAuthUrl = `/auth/google${returnTo ? `?returnTo=${returnTo}` : ''}`;

  return (
    <Stack className='max-w-sm mx-auto pt-16' gap={0}>
      <Title className='text-center' order={2} mb="lg" fw={500}>
        {type === 'login' ? 'Sign in to your account' : 'Create an account'}
      </Title>
      <Paper radius="md" p="xl" withBorder>
        <Form action='/auth/email' method='POST'>
          <Stack>
            {type === 'login' ? null : (
              <Group grow>
                <TextInput required label="First name" name='firstName' placeholder="Jane"/>
                <TextInput required label="Last name" name='lastName' placeholder="Doe"/>
              </Group>
            )}
            <TextInput required label="Email" name='email' placeholder="hello@example.com"/>
            <Button type="submit" fullWidth>
              {type === 'login' ? 'Sign in' : 'Create account'}
            </Button>
          </Stack>
        </Form>

        <Divider label="Or continue with" labelPosition="center" my="lg" />

        <Form action={googleAuthUrl} method="POST">
          <GoogleButton type='submit' fullWidth>Sign in with Google</GoogleButton>
        </Form>

      </Paper>
      <Group mt='xs'>
        <Anchor component={Link} to={type === 'login' ? '/signup' : '/login'} type="button" c="dimmed" size="xs">
          {type === 'login' ? "Don't have an account? Register" : "Already have an account? Sign in"}
        </Anchor>
      </Group>
    </Stack>
  );
}
