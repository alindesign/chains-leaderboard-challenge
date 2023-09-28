'use client';
import Container from '@mui/joy/Container';
import { useMemo } from 'react';
import Stack from '@mui/joy/Stack';
import { Header } from '@/components/header';

import { useLatestBlocks, useLatestBlockSubscription } from './_actions';
import { TopChainsTable } from './_partials/top-chains-table';
import { LatestBlocksTable } from './_partials/latest-blocks-table';

export function LeaderboardPage() {
  const latestBlocks = useLatestBlocks();

  // Create a map base on the relay number we've got from the latest blocks,
  // so we can sort the chains by the relay number and pick the top 10.
  const leaderboard = useMemo(() => {
    const chainsMap = latestBlocks.data
      ?.map(({ relays }) => relays)
      .flat()
      .reduce(
        (acc, relay) => {
          acc[relay.specId] ??= 0;
          acc[relay.specId] += relay.relayNum;
          return acc;
        },
        {} as Record<string, number>,
      );

    return Object.entries(chainsMap ?? {})
      .map(([chainId, relayNumber]) => ({
        chainId,
        relayNumber,
      }))
      .sort((a, b) => b.relayNumber - a.relayNumber)
      .slice(0, 10);
  }, [latestBlocks.data]);

  // Subscribe to the latest block, only if the latest blocks is not loading.
  useLatestBlockSubscription(!latestBlocks.isLoading);

  return (
    <Container>
      <Header />
      <Stack py={5} gap={6}>
        <Stack gap={2}>
          <TopChainsTable
            data={leaderboard}
            isLoading={latestBlocks.isLoading}
            noResults={leaderboard.length === 0}
          />
        </Stack>

        {latestBlocks.data ? (
          <Stack gap={2}>
            <LatestBlocksTable data={latestBlocks.data} />
          </Stack>
        ) : null}
      </Stack>
    </Container>
  );
}

export default LeaderboardPage;
