import Typography, { TypographyProps } from '@mui/joy/Typography';

interface Props extends TypographyProps {
  chainId: string;
}

/**
 * A simple component that shows the chain name based on the chain id.
 * @param chainId
 * @param rest
 * @constructor
 */
export function ChainName({ chainId, ...rest }: Props) {
  return (
    <Typography {...rest}>
      {chainId.toUpperCase() in chainNames
        ? chainNames[chainId.toUpperCase() as keyof typeof chainNames]
        : chainId}
    </Typography>
  );
}

const chainNames = {
  APT1: 'Aptos Mainnet',
  ARB1: 'Arbitrum',
  ARBN: 'Arbitrum-Nova',
  AVAX: 'Avalanche Mainnet',
  AXELAR: 'Axelar Mainnet',
  AXELART: 'Axelar Testnet',
  BASET: 'Base Testnet',
  CANTO: 'Canto Mainnet',
  ALFAJORES: 'Celo - Alfajores',
  CELO: 'Celo',
  COS5: 'Cosmos Hub',
  COS5T: 'Cosmos Hub Testnet',
  ETH1: 'Ethereum',
  GTH1: 'Ethereum Goerli',
  EVMOS: 'Evmos Mainnet',
  EVMOST: 'Evmos Testnet',
  FTM250: 'Fantom',
  FVM: 'Filecoin Mainnet',
  JUN1: 'Juno',
  JUNT1: 'Juno Testnet',
  LAV1: 'Lava',
  OPTM: 'Optimism Mainnet',
  OPTMT: 'Optimism Testnet Goerli',
  COS3: 'Osmosis',
  COS4: 'Osmosis Testnet',
  POLYGON1: 'Polygon',
  POLYGON1T: 'Polygon Testnet',
  SOLANA: 'Solana Mainnet',
  SOLANAT: 'Solana Testnet',
  STRK: 'Starknet',
};
