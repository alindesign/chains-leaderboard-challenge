'use client';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import NextLink from 'next/link';
import { routes } from '@/lib/routes';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <>
      <Grid container py={3}>
        <Link
          component={NextLink}
          level={'title-lg'}
          color={'neutral'}
          href={routes.home}
        >
          Growth Team Challenge - Chains Leaderboard
        </Link>

        <Grid container flexGrow={1} justifyContent={'flex-end'} gap={2}>
          <Button
            component={NextLink}
            href={routes.leaderboard}
            variant={pathname === routes.leaderboard ? 'soft' : 'plain'}
          >
            Leaderboard
          </Button>
          <Button
            component={NextLink}
            href={routes.challenge}
            variant={pathname === routes.challenge ? 'soft' : 'plain'}
          >
            Challenge
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}
