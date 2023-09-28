import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import Grid from '@mui/joy/Grid';
import CircularProgress from '@mui/joy/CircularProgress';
import { ChainName } from '@/components/chain-name';

interface Props {
  isLoading: boolean;
  noResults: boolean;
  data: {
    relayNumber: number;
    chainId: string;
  }[];
}

/**
 * A table that shows the top 10 chains.
 * @param isLoading
 * @param noResults
 * @param data
 */
export function TopChainsTable({ isLoading, noResults, data }: Props) {
  return (
    <>
      <Typography level={'h1'}>Top 10 Chains</Typography>
      <Table aria-label="top 10 chains table">
        <thead>
          <tr>
            <th>Chain</th>
            <th>Relay Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ relayNumber, chainId }) => (
            <tr key={chainId}>
              <td>
                <ChainName chainId={chainId} />
              </td>
              <td>{relayNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isLoading ? (
        <Grid container p={3} justifyContent={'center'} alignItems={'center'}>
          <CircularProgress />
        </Grid>
      ) : noResults ? (
        <Grid container p={3} justifyContent={'center'} alignItems={'center'}>
          <Typography level={'h4'} color={'neutral'}>
            No data
          </Typography>
        </Grid>
      ) : null}
    </>
  );
}
