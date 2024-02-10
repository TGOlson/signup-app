import {
  TextInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  Title,
} from '@mantine/core';

import { GoogleButton } from './GoogleButton';
import { Form, useSearchParams } from '@remix-run/react';

export function AuthForm(props: PaperProps) {
  const [params] = useSearchParams();
  const returnTo = params.get('returnTo');
  const googleAuthUrl = `/auth/google${returnTo ? `?returnTo=${returnTo}` : ''}`;

  // const [type, toggle] = useToggle(['login', 'register']);
  // const form = useForm({
  //   initialValues: {
  //     email: '',
  //     name: '',
  //     password: '',
  //     terms: true,
  //   },

  //   validate: {
  //     email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
  //     password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
  //   },
  // });

  return (
    <Stack className='max-w-sm mx-auto pt-24' gap={0}>
      <Paper radius="md" p="xl" withBorder>
        <Title className='text-center' order={3} mb="lg" fw={500}>Sign in to your account</Title>
        <Form action='/auth/email' method='POST'>
          <Stack>
            <TextInput
              required
              label="Email"
              name='email'
              placeholder="hello@example.com"
            />
            <Button type="submit" fullWidth>Sign in</Button>
          </Stack>
        </Form>

        <Divider label="Or continue with" labelPosition="center" my="lg" />

        <Form action={googleAuthUrl} method="POST">
          <GoogleButton type='submit' fullWidth>Sign in with Google</GoogleButton>
        </Form>
      </Paper>
      <div>
        <Anchor component="button" type="button" c="dimmed" size="xs">
          {"Don't have an account? Register"}
        </Anchor>
      </div>
    </Stack>
  );
}
