import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Title,
} from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
// import {
//   IconNotification,
//   IconCode,
//   IconBook,
//   IconChartPie3,
//   IconFingerprint,
//   IconCoin,
//   IconChevronDown,
// } from '@tabler/icons-react';
// import classes from './HeaderMegaMenu.module.css';
import { Link } from '@remix-run/react';

// .header {
//   height: rem(60px);
//   padding-left: var(--mantine-spacing-md);
//   padding-right: var(--mantine-spacing-md);
//   border-bottom: rem(1px) solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
// }

export function HeaderMenu() {
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
            <Button component={Link} to="/login" variant="default">Log in</Button>
            <Button component={Link} to="/login">Sign up</Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
