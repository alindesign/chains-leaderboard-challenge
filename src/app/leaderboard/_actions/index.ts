'use client';
import { useQuery } from 'react-query';
import { queryClient } from '@/lib/react-query';
import { Block, Relay } from '@/lib/lava';

import { fetchLatestBlock, fetchLatestBlocks } from './actions';

/**
 * Fetch the latest blocks from the Lava chain.
 */
export function useLatestBlocks() {
  return useQuery(['lavanet', 'latestBlocks'], () => fetchLatestBlocks(20), {
    refetchOnWindowFocus: false,
  });
}

/**
 * A subscription to the latest block, which will update the latest blocks list
 * when a new block is found. This is used to keep the latest blocks list up to
 * date.
 *
 * When a new block is found, the latest blocks list is updated by adding the
 * new block to the top of the list and removing the last block.
 *
 * The subscription is using long polling to fetch the latest block every 10 seconds.
 * The subscription is disabled by default, the argument `enabled` is used to enable it.
 * @param enabled
 */
export function useLatestBlockSubscription(enabled: boolean) {
  useQuery(['lavanet', 'latestBlock'], () => fetchLatestBlock(), {
    enabled,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    onSuccess: (data) => {
      // get the latest blocks list from the react-query cache
      const latestBlocks =
        queryClient.getQueryData<{ block: Block; relays: Relay[] }[]>([
          'lavanet',
          'latestBlocks',
        ]) ?? [];

      // check if the new block is already in the list
      const existingBlock = latestBlocks.find(
        ({ block }) => block.header.height === data.block.header.height,
      );

      // if the block is already in the list, do nothing
      if (existingBlock) {
        return;
      }

      // else pop the last block and add the new block to the top of the list
      latestBlocks.pop();
      const newBlocks = [data, ...latestBlocks];

      // update the latest blocks list in the react-query cache
      queryClient.setQueryData<{ block: Block; relays: Relay[] }[]>(
        ['lavanet', 'latestBlocks'],
        newBlocks,
      );
    },
  });
}
