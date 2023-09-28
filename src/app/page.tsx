import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Link from 'next/link';
import { routes } from '@/lib/routes';

/**
 * A basic home page, that links the leaderboard and challenge page.
 */
export function HomePage() {
  return (
    <Stack
      flexGrow={1}
      width={'100%'}
      gap={2}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Typography level={'h1'}>Chains Leaderboard</Typography>
      <Grid container alignItems={'center'} gap={2}>
        <Button
          component={Link}
          variant={'soft'}
          color={'primary'}
          href={routes.leaderboard}
        >
          Leaderboard
        </Button>

        <Button
          component={Link}
          variant={'soft'}
          color={'primary'}
          href={routes.challenge}
        >
          Challenge
        </Button>
      </Grid>
    </Stack>
  );
}

export default HomePage;
