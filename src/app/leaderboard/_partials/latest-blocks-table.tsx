import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import Link from '@mui/joy/Link';
import { Block, Relay } from '@/lib/lava';

interface Props {
  data: { block: Block; relays: Relay[] }[];
}

// using the default date time formatter, no need for another library
// for this project
const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeStyle: 'short',
});

/**
 * A table that shows the latest blocks.
 */
export function LatestBlocksTable({ data }: Props) {
  return (
    <>
      <Typography level={'h3'}>Latest blocks</Typography>
      <Table aria-label="latest block table">
        <thead>
          <tr>
            <th>Height</th>
            <th>Chain ID</th>
            <th>Relay Number</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ block, relays }) => (
            <tr key={block.header.height}>
              <td>
                <Link
                  href={`https://lava.explorers.guru/block/${block.header.height}`}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                >
                  {block.header.height}
                </Link>
              </td>
              <td>{block.header.chain_id}</td>
              <td>{relays.reduce((acc, relay) => acc + relay.relayNum, 0)}</td>
              <td>{dateTimeFormatter.format(new Date(block.header.time))}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
