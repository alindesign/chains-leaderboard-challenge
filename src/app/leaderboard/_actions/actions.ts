'use server';

import { Block, Lava } from '@/lib/lava';

// Found the imports in the Lava SDK, used to decode block data
import { Tx } from '@lavanet/lava-sdk/src/codec/cosmos/tx/v1beta1/tx';
import { MsgRelayPayment } from '@lavanet/lava-sdk/bin/src/codec/pairing/tx';

/**
 * The function decode the block transactions and extract the relays from them.
 * @param block
 */
function mapBlockReplays(block: Block) {
  const txs = block?.data?.txs ?? [];
  const relays = txs
    .map((tx) => {
      // Decode transaction
      const t = Tx.decode(Buffer.from(tx, 'base64'));

      // Filter the messages and map the relays from them
      return (
        t.body?.messages
          ?.filter(
            ({ typeUrl }) =>
              typeUrl === '/lavanet.lava.pairing.MsgRelayPayment',
          )
          ?.map(({ value }) => {
            const msg = MsgRelayPayment.decode(value);
            return msg.relays.map((r) => ({
              relayNum: r.relayNum.toNumber(),
              specId: r.specId,
              lavaChainId: r.lavaChainId,
              blockHeight: block.header.height,
            }));
          }) ?? []
      );
    })
    .flat(3);

  return { block, relays };
}

/**
 * Fetch latest blocks from the Lava chain.
 * @param size
 */
export async function fetchLatestBlocks(size: number) {
  const lava = Lava.instance;
  const latestBlock = await lava.getLatestBlock();

  // Fetch 20 of the latest blocks from the Lava chain base on the latest block height.
  const blocks = await lava.fetchBlocks(
    latestBlock.header.height,
    // the method can't fetch more than 20 blocks at once
    Number(latestBlock.header.height) - Math.min(size, 20),
  );

  // The previous method returns an array of blocks, of which transactions data is not included,
  // so we need to fetch the blocks again to get the txs data.
  const latestBlocks = await Promise.all(
    blocks.map(async (block) => lava.getBlock(block.header.height)),
  );

  // map the relays from the blocks
  return latestBlocks.map(mapBlockReplays).flat(1);
}

/**
 * Fetch the latest block from the Lava chain.
 */
export async function fetchLatestBlock() {
  const lava = Lava.instance;
  const block = await lava.getLatestBlock();

  // map the relays from the block
  return mapBlockReplays(block);
}
